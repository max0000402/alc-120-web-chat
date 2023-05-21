using Backend.Models;
using Backend.ViewModels;

namespace Backend.Hubs.Interfaces;

public interface IChatClient
{
    Task ReceiveMessage(MessageCreateRequest messageCreateRequest);
    
}