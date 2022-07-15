using Autofac;
using Care.Minsa.DPVIH.Tablero.Application.Report;
using Microsoft.Extensions.Configuration;
using Release.Helper.ReportingServices;

namespace Care.Minsa.DPVIH.Tablero.API.App_Start
{
    public class ContextDbModule : Autofac.Module
    {
        public static IConfiguration Configuration;

        protected override void Load(ContainerBuilder builder)
        {
            var rc = new ReportConfig();
            Configuration.GetSection("ReportConfig").Bind(rc);

            builder.RegisterType<ReportOwnManager>().As<IReportManager>().WithParameter("config", rc);
        }
    }
}