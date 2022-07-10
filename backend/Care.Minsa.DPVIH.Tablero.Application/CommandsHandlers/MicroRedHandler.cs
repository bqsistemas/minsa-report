using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Interfaces.Queries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class MicroRedHandler :
        IRequestHandler<ListarMicroRedCommand, List<MicroRedDto>>
    {
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;
        public MicroRedHandler(IFiltrosReporteQuery filtrosReporteQuery)
        {
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public Task<List<MicroRedDto>> Handle(ListarMicroRedCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetMicroRedes(request.Disa, request.Red);
        }
    }
}
