using Backend.DataBase;
using Backend.Models;
using Backend.Services.Interfaces;
using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class GroupService : IGroupService
{
    private readonly ApplicationContext _context;

    public GroupService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<GroupDetail>> GetGroupsForUser(int id)
    {
        return await _context.Users
            .Where(user => user.Id == id)
            .Include(user => user.Groups)
            .ThenInclude(group => group.Members)
            .SelectMany(user => user.Groups)
            .Select(
                group => new GroupDetail()
                {
                    Id = group.Id,
                    MembersId = group.Members.Select(member => member.Id).ToList(),
                    Name = group.Name
                })
            .ToListAsync();
    }

    public async Task GroupCreate(GroupRegisterModel newGroup, int id)
    {
        var group = new Group(newGroup.Name);
        var users = await _context.Users.Where(user => newGroup.MembersId.Contains(user.Id)).ToListAsync();
        group.Members.AddRange(users);
        var owner = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
        group.Members.Add(owner);
        _context.Add(group);
        await _context.SaveChangesAsync();
    }
}