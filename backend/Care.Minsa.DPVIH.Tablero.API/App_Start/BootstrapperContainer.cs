using Autofac;
using Microsoft.Extensions.Configuration;

namespace Care.Minsa.DPVIH.Tablero.API.App_Start
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;

        public static void Register(ContainerBuilder builder)
        {
            //Add Context
            ContextDbModule.Configuration = Configuration;
            builder.RegisterModule<ContextDbModule>();

        }
    }
}
