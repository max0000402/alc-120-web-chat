namespace Backend.ViewModels;

public class MessageResponse
{
    public int Id { get; set; }
    public int SenderId { get; set; }
    public string Payload { get; set; }
    public long CreatedAt { get; set; }
    public int GroupId { get; set; }
}