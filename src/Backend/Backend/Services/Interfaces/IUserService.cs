using Backend.ViewModels;

namespace Backend.Services.Interfaces;

public interface IUserService
{
    public Task<LoginResponse?> Register(RegisterModel newUser);
    public Task<LoginResponse?> SignIn(SignInModel currentUser);
    public Task<DetailUserResponse?> Detail(int id);
    
}