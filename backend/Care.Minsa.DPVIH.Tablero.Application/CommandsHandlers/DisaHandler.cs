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
    public class DisaHandler :
        IRequestHandler<ListarDisaCommand, List<DisaDto>>
    {
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;
        public DisaHandler(IFiltrosReporteQuery filtrosReporteQuery)
        {
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public Task<List<DisaDto>> Handle(ListarDisaCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetDisas();
        }
    }
}
