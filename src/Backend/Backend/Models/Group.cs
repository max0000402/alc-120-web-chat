namespace Backend.Models;

public class Group
{
    public int Id { get; private init; }
    public string Name { get; set; }
    
    public List<Message> Messages { get; set; } = new();
    public List<User> Members { get; set; } = new();

    private Group() { }

    public Group(int id, string name)
    {
        Id = id;
        Name = name;
    }
    
}