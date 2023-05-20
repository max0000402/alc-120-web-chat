using Backend.ViewModels;

namespace Backend.Services.Interfaces;

public interface IGroupService
{
    public Task<List<GroupDetail>> GetGroupsForUser(int id);
}