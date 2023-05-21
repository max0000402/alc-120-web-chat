using Backend.DataBase;
using Backend.Hubs;
using Backend.Hubs.Interfaces;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interfaces;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _chatHub;
    private readonly ApplicationContext _context;
    private readonly IMessageService _messageService;

    public ChatController(IHubContext<ChatHub> chatHub, ApplicationContext context, IMessageService messageService)
    {
        _chatHub = chatHub;
        _context = context;
        _messageService = messageService;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetMessages(int groupId)
    {
        var user = await _context.Users.Where(user => user.Id == Convert.ToInt32(User.Identity.Name)).FirstOrDefaultAsync();
        var group = await _context.Groups
            .Where(group => group.Id == groupId)
            .Include(group => group.Members)
            .FirstOrDefaultAsync();

        if (group == null)
        {
            return NotFound();
        }
        
        if (group.Members.Any(member => member.Id == user.Id))
        {
            return Ok(await _messageService.GetMessages(groupId));
        }

        return Unauthorized();
    }
    
    [Authorize]
    [HttpPost]
    public async Task PostMessage(MessageCreateRequest messageCreateRequest)
    {
        var user = await _context.Users
            .Where(user => user.Id == Convert.ToInt32(User.Identity.Name))
            .FirstOrDefaultAsync();

        var message = new Message(user.Id, messageCreateRequest.RoomId, messageCreateRequest.Message, DateTime.UtcNow);
        _context.Messages.Add(message);
        await _context.SaveChangesAsync();
        await _chatHub.Clients.Groups(messageCreateRequest.RoomId.ToString()).SendAsync("Receive", new MessageResponse
        {
            Id = message.Id,
            Payload = message.Payload,
            CreatedAt = message.CreatedAt.Ticks,
            GroupId = message.GroupId,
            SenderId = message.SenderId
        });
    }

}