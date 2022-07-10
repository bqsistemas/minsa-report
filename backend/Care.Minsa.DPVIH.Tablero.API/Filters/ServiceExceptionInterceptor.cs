using Care.Minsa.DPVIH.Tablero.Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Care.Minsa.DPVIH.Tablero.API.Filters
{
    public class ServiceExceptionInterceptor : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            switch (context.Exception)
            {
                case BusinessException bex:
                    context.Result = new ObjectResult(new
                    {
                        Code = "BUSINESS_ERRORS",
                        bex.Message,
                        bex.Details
                    })
                    {
                        StatusCode = 500
                    };
                    break;
            }
        }
    }
}
