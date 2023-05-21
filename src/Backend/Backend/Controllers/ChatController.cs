using Backend.DataBase;
using Backend.Hubs;
using Backend.Hubs.Interfaces;
using Backend.Models;
using Backend.Services;
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

    public ChatController(IHubContext<ChatHub> chatHub, ApplicationContext context)
    {
        _chatHub = chatHub;
        _context = context;
    }

    
    
    [HttpPost("messages")]
    [Authorize]
    public async Task PostMessage(ChatMessage message)
    {
        var user = await _context.Users
            .Where(user => user.Id == Convert.ToInt32(User.Identity.Name))
            .FirstOrDefaultAsync();
        await _chatHub.Clients.Groups(message.RoomId.ToString()).SendAsync("Receive", message.Message, message.RoomId);
    }

}