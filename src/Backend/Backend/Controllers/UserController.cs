using Backend.Services.Interfaces;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel newUser)
    {
        var result = await _userService.Register(newUser);
        return result != null ? Ok(result) : NotFound();
    }
    [HttpPost("login")]
    public async Task<IActionResult> SignIn(SignInModel currentUser)
    {
        var result = await _userService.SignIn(currentUser);
        return result != null ? Ok(result) : NotFound("Invalid username or password");
    }

    [HttpGet("current")]
    [Authorize]
    public async Task<DetailUserResponse> Current()
    {
        return await _userService.Detail(Convert.ToInt32(User.Identity.Name));

    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Detail(int id)
    {
        var result = await _userService.Detail(id);
        return result !=null ? Ok(result) : NotFound();
    }
}