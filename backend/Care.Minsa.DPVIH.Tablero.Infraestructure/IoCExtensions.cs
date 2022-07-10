using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public static class IoCExtensions
    {
        public static IServiceCollection AddInfrastructureDependencies(this IServiceCollection services, string dbStringConnection)
        {
            services.AddDbContext<BackendBPDbContext>(options =>
            {
                options.UseSqlServer(dbStringConnection);
            });

            ///
            /// Repository area
            ///
            #region Repository area
            // Client
            services.AddScoped<IClientRepository, ClientRepository>();
            // Account
            services.AddScoped<IAccountRepository, AccountRepository>();
            // Transaction
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            return services;
        }

        public static void MigrateDatabases(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var tenantsDbContext = serviceScope.ServiceProvider.GetRequiredService<BackendBPDbContext>();

                // Code First
                // https://www.npgsql.org/efcore/
                // tenantsDbContext.Database.Migrate();
            }
        }
    }
}
