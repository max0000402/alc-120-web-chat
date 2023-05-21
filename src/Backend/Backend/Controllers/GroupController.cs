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
    public async Task GroupCreate(GroupRegisterModel newGroupe)
    {
        await _groupService.GroupCreate(newGroupe,Convert.ToInt32(User.Identity.Name));
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<GroupDetail> Detail(int id)
    {
        return await _groupService.Detail(id, Convert.ToInt32(User.Identity.Name));
    }
}