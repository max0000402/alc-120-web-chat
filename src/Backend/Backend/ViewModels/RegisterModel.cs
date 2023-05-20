using System.ComponentModel.DataAnnotations;

namespace Backend.ViewModels;

public class RegisterModel
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Login { get; set; }
}