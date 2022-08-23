using Care.Minsa.DPVIH.Tablero.Application;
using Care.Minsa.DPVIH.Tablero.API.Filters;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.NodaTime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using NodaTime;
using NodaTime.Serialization.SystemTextJson;
using System;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Autofac;
using Care.Minsa.DPVIH.Tablero.API.App_Start;
using System.Collections.Generic;

namespace Care.Minsa.DPVIH.Tablero.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            BackendBPDB = Environment.GetEnvironmentVariable("BACKEND_MINSA_DPVIH_BP_DB") ?? Configuration.GetConnectionString("Database");
        }

        public IConfiguration Configuration { get; }
        private string BackendBPDB { get; set; }
        private string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins(Configuration.GetSection("CorsDomain").Get<string[]>())
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                                  });
            });

            services.AddControllers(options =>
                {
                    options.Filters.Add(new ServiceExceptionInterceptor());
                })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
                    options.JsonSerializerOptions.Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                })
                .AddFluentValidation();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Care.Minsa.DPVIH.Tablero.Exam", Version = "v1" });

                JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions();
                jsonSerializerOptions.ConfigureForNodaTime(DateTimeZoneProviders.Tzdb);
                jsonSerializerOptions.Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
                c.ConfigureForNodaTimeWithSystemTextJson(jsonSerializerOptions);
            });

            services.AddApplicationDependencies();
            services.AddInfrastructureDependencies(BackendBPDB);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minsa Backend DPVIH API");
                });
            }
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Is extensions from infraestructure to create dabase and execute the migrations
            app.MigrateDatabases();
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            //Register Types
            BootstrapperContainer.Configuration = Configuration;
            BootstrapperContainer.Register(builder);
        }
    }
}
