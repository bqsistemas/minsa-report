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
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Transaction> Transaction { get; set; }
        public BackendBPDbContext(DbContextOptions<BackendBPDbContext> options) 
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClientEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new AccountEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TransactionEntityTypeConfiguration());
        }
    }
}
