using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.DataBase.Configurations;

public class MessageConfiguration: IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.HasKey(message => message.Id);
        builder.HasKey(message => message.GroupId);
        builder.HasKey(message => message.SenderId);
        builder.Property(message => message.CreatedAt).IsRequired();
        builder.Property(message => message.Payload).IsRequired();

        builder
            .HasOne(message => message.Group)
            .WithMany(group => group.Messages)
            .HasForeignKey(message => message.GroupId);

        builder
            .HasOne(message => message.Sender)
            .WithMany()
            .HasForeignKey(message => message.SenderId);
    }
}