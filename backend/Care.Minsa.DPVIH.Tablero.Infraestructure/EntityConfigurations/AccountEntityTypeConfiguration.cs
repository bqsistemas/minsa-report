using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.EntityConfigurations
{
    public class AccountEntityTypeConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("account");
            builder.HasKey(x => x.AccountId);
            builder.Property(x => x.AccountId).ValueGeneratedOnAdd();
            builder.HasOne(cs => cs.Client)
                .WithMany(c => c.Accounts)
                .HasForeignKey(cs => cs.ClientId);
            builder.Property(x => x.InitialBalance).HasDefaultValue(0);
            builder.Property(x => x.AvaibleBalance).HasDefaultValue(0);
            builder.Property(x => x.Status).HasDefaultValue(true);
        }
    }
}
