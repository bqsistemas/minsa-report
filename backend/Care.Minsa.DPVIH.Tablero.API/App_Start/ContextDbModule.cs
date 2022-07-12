using Autofac;
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

            builder.RegisterType<ReportManager>().As<IReportManager>().WithParameter("config", rc);
        }
    }
}