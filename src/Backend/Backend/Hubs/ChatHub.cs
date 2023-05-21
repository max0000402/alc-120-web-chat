using Backend.DataBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Backend.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly ApplicationContext _context;

    public ChatHub(ApplicationContext context)
    {
        _context = context;
    }

    
    public override async Task OnConnectedAsync()
    {
        var user = await _context.Users
            .Where(user => user.Id == Convert.ToInt32(Context.User.Identity.Name))
            .Include(user => user.Groups)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return;
        } 
        
        foreach (var group in user.Groups)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, group.Id.ToString());
        }
    }
}