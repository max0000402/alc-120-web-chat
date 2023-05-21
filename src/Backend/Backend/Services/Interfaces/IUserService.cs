using Backend.ViewModels;

namespace Backend.Services.Interfaces;

public interface IUserService
{
    public Task<bool> Register(RegisterModel newUser);
    public Task<string?> SignIn(SignInModel currentUser);
    public Task<DetailUserResponse?> Detail(int id);
    
}