using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class FiltrosReporteHandler :
        IRequestHandler<FiltrosReporteCommand, List<MaestroIngresoDto>>
    {
        public FiltrosReporteHandler(
            )
        {
        }

        public Task<List<MaestroIngresoDto>> Handle(FiltrosReporteCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
