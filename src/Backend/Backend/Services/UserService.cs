using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Backend.DataBase;
using Backend.Models;
using Backend.Services.Interfaces;
using Backend.Settings;
using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services;

public class UserService : IUserService
{
    private readonly ApplicationContext _context;

    public UserService(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<LoginResponse?> Register(RegisterModel newUser)
    {
        var hash = Convert.ToHexString(GetHash(newUser.Password));
        var user = new User(newUser.Name, hash, newUser.Login);
        _context.Add(user);
        await _context.SaveChangesAsync();
        return new LoginResponse { Token = GenerateJwtToken(user.Id) };
    }

    public async Task<LoginResponse?> SignIn(SignInModel currentUser)
    {
        //var currentHash = currentUser.Password;

        var existingUser = await _context.Users.Where(user => user.Login == currentUser.Login).FirstOrDefaultAsync();
        if (existingUser == null)
        {
            return null;
        }

        var currentHash = Convert.ToHexString(GetHash(currentUser.Password));
        return existingUser.Password != currentHash
            ? null
            : new LoginResponse { Token = GenerateJwtToken(existingUser.Id) };
    }

    private byte[] GetHash(string password)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(password);
        using SHA512 shaM = SHA512.Create();
        return shaM.ComputeHash(bytes);
    }

    public async Task<DetailUserResponse?> Detail(int id)
    {
        
        var existingUser = await _context.Users
            .Where(user => user.Id == id)
            .Select(user => new DetailUserResponse
            {
                Name = user.Name,
                Id = user.Id,
                Login = user.Login
            })
            .FirstOrDefaultAsync();

        return existingUser;
    }

    private string GenerateJwtToken(int id)
    {
        var claims = new List<Claim>() { new Claim(ClaimTypes.Name, id.ToString()) };
        var jwt = new JwtSecurityToken(
            issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256));
        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
   
}