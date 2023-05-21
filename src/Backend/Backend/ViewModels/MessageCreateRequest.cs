namespace Backend.ViewModels;

public class MessageCreateRequest
{
    public int RoomId { get; set;  }
    public string Message { get; set; }
}