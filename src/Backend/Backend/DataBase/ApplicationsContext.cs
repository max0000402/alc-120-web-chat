using System.Reflection;
using Backend.DataBase.Configurations;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DataBase;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<User> Users { get; init; }
    public DbSet<Group> Groups { get; init; }
    public DbSet<Message> Messages { get; init; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(UserConfiguration)));
    }
}