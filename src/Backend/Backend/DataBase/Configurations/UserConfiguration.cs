using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataBase.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(user => user.Id);
        builder.Property(user => user.Name).IsRequired();
        builder.Property(user => user.Password).IsRequired();
        builder.Property(user => user.Login).IsRequired();

        builder
            .HasMany(user => user.Groups)
            .WithMany(group => group.Members);
    }
}