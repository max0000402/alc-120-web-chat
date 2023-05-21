namespace Backend.Models;

public class ChatMessage
{
    public int RoomId { get; set;  }
    public int UserId { get; set; }
    public string Message { get; set; }
}