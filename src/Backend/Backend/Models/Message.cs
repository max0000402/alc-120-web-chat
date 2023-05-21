using System.Data.Common;

namespace Backend.Models;

public class Message
{
    public int Id { get; private init; }
    public int SenderId { get; private init; }
    public User Sender { get; set; }
    public string Payload { get; set; }
    public DateTime CreatedAt { get; init; }
    public int GroupId { get; private init; }
    public Group Group { get; set; }

    private Message() { }

    public Message(int senderId, int groupId, string payload, DateTime createdAt)
    {
        SenderId = senderId;
        Payload = payload;
        CreatedAt = createdAt;
        GroupId = groupId;
    }
    
}