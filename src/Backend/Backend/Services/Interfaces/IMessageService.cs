using Backend.ViewModels;

namespace Backend.Services.Interfaces;

public interface IMessageService
{
    public Task<List<MessageResponse>> GetMessages(int groupId);
}