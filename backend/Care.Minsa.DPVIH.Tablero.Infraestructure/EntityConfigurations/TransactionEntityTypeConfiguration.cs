using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.EntityConfigurations
{
    public class TransactionEntityTypeConfiguration : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.ToTable("transaction");
            builder.HasKey(x => x.TransactionId);
            builder.Property(x => x.TransactionId).ValueGeneratedOnAdd();
            builder.HasOne(cs => cs.Account)
                .WithMany(c => c.Transactions)
                .HasForeignKey(cs => cs.AccountId);
            builder.Property(x => x.Amount).HasDefaultValue(0);
            builder.Property(x => x.Balance).HasDefaultValue(0);
        }
    }
}
