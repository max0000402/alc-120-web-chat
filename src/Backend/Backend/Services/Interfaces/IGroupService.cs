using Backend.Models;
using Backend.ViewModels;

namespace Backend.Services.Interfaces;

public interface IGroupService
{
    public Task<List<GroupDetail>> GetGroupsForUser(int id);
    public Task GroupCreate(GroupRegisterModel newGroup, int id);
    public Task GroupLeft(int userId, int groupId);
}