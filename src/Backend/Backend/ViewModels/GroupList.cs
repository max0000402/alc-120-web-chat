namespace Backend.ViewModels;

public class GroupDetail
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<int> MembersId { get; set; }
}