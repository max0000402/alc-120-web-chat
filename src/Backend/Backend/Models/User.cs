namespace Backend.Models;

public class User
{
    public int Id { get; private init; } 
    public string Name { get; set; }
    public string Password { get; private set; }
    public string Login { get; private set; }
    public List<Group> Groups { get; set; } = new();
    
    private User() {}

    public User(string name, string hash, string login)
    {
        Name = name;
        Password = hash;
        Login = login;
    }

    public void UpdateCredentials(string hash)
    {
        Password = hash;
    }
}