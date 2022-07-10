using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Application.Validations;
using Care.Minsa.DPVIH.Tablero.Core.Parameters;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using NodaTime;
using System.Reflection;

namespace Care.Minsa.DPVIH.Tablero.Application
{
    public static class IoCExtensions
    {
        public static IServiceCollection AddApplicationDependencies(this IServiceCollection services)
        {
            ///
            /// Instant area 
            ///
            services.AddTransient<IClock>(x => SystemClock.Instance);

            ///
            /// Parameters area: Read environment variables
            ///
            services.AddSingleton<IGlobalParameters, GlobalParameters>();

            ///
            /// Mapper area
            ///
            services.AddAutoMapper(typeof(MappingProfile));


            ///
            /// Validations area
            ///
            #region Validations area
            // Client
            services.AddSingleton<IValidator<CreateClientRequest>, CreateClientRequestValidator>();
            services.AddSingleton<IValidator<UpdateClientRequest>, UpdateClientRequestValidator>();
            // Account
            services.AddSingleton<IValidator<CreateAccountRequest>, CreateAccountRequestValidator>();
            services.AddSingleton<IValidator<UpdateAccountRequest>, UpdateAccountRequestValidator>();
            // Transaction
            services.AddSingleton<IValidator<CreateTransactionRequest>, CreateTransactionRequestValidator>();
            services.AddSingleton<IValidator<UpdateTransactionRequest>, UpdateTransactionRequestValidator>();
            // Report
            services.AddSingleton<IValidator<ReportSummaryRequest>, ReportSummaryRequestValidator>();
            #endregion

            ///
            /// Validations mediatR
            ///
            services.AddMediatR(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
