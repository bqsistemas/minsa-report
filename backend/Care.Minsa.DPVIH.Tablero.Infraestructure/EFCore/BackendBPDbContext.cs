using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore
{
    public class BackendBPDbContext : DbContext
    {
        public virtual DbSet<TbMaestroIngreso> TbMaestroIngreso { get; set; }
        public BackendBPDbContext(DbContextOptions<BackendBPDbContext> options) 
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TbMaestroIngresoEntityTypeConfiguration());
        }
    }
}
