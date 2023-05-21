using Backend.Models;
namespace Backend.Hubs.Interfaces;

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
    
}