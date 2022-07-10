using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.EntityConfigurations
{
    public class ClientEntityTypeConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("client");
            builder.HasKey(x => x.ClientId);
            builder.Property(x => x.ClientId).ValueGeneratedOnAdd();
            builder.HasMany(x => x.Accounts);
        }
    }
}
