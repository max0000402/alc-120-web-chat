using Backend.Models;
using Backend.Services.Interfaces;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupController : ControllerBase
{
    private readonly IGroupService _groupService;

    public GroupController(IGroupService groupService)
    {
        _groupService = groupService;
    }

    [HttpGet("current")]
    [Authorize]
    public async Task<List<GroupDetail>> Current()
    {
        return await _groupService.GetGroupsForUser(Convert.ToInt32(User.Identity.Name));
    }

    [HttpPost]
    [Authorize]
    public async Task GroupCreate(GroupRegisterModel newGroup)
    {
        await _groupService.GroupCreate(newGroup,Convert.ToInt32(User.Identity.Name));
    }

    [HttpPut("{id}/left")]
    [Authorize]
    public async Task GroupLeft(int id)
    {
        await _groupService.GroupLeft( Convert.ToInt32(User.Identity.Name), id);

    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<GroupDetail> Detail(int id)
    {
        return await _groupService.Detail(id, Convert.ToInt32(User.Identity.Name));
    }
}