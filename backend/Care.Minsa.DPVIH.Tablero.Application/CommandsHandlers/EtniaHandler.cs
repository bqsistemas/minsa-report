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
    public class EtniaHandler :
        IRequestHandler<ListarEtniaCommand, List<EtniaDto>>
    {
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;
        public EtniaHandler(IFiltrosReporteQuery filtrosReporteQuery)
        {
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public Task<List<EtniaDto>> Handle(ListarEtniaCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetEtnias();
        }
    }
}
