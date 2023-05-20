using Backend.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataBase.Configurations;

public class GroupConfiguration
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.HasKey(group => group.Id);
        builder.Property(group => group.Name).IsRequired();

        builder
            .HasMany(group => group.Messages)
            .WithOne()
            .HasForeignKey(message => message.GroupId);

        builder
            .HasMany(group => group.Members)
            .WithMany(user => user.Groups);
    }
}