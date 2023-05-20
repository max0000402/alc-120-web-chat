using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels;

public class SignInModel
{
    [Required]
    public string Password { get; set; }
    [Required]
    public string Login { get; set; }
}
