using Backend.DataBase;
using Backend.Services.Interfaces;
using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class MessageService : IMessageService
{
    private readonly ApplicationContext _context;

    public MessageService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<MessageResponse>> GetMessages(int groupId)
    {
        return await _context.Messages
            .Where(message => message.GroupId == groupId)
            .Select(message => new MessageResponse
            {
                Id = message.Id,
                GroupId = message.GroupId,
                Payload = message.Payload,
                CreatedAt = message.CreatedAt.Ticks,
                SenderId = message.SenderId
            })
            .ToListAsync();
    }
}