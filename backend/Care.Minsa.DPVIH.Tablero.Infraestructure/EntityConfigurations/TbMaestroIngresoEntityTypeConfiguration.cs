using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.EntityConfigurations
{
    public class TbMaestroIngresoEntityTypeConfiguration : IEntityTypeConfiguration<TbMaestroIngreso>
    {
        public void Configure(EntityTypeBuilder<TbMaestroIngreso> builder)
        {
            builder.ToTable("TB_MAESTRO_INGRESO");
        }
    }
}
