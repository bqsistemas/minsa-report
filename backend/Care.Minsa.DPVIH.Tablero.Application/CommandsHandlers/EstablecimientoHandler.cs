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
    public class EstablecimientoHandler :
        IRequestHandler<ListarEstablecimientoCommand, List<EstablecimientoDto>>,
        IRequestHandler<ListarDatosEstablecimientoCommand, List<EstablecimientoDto>>
    {
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;
        public EstablecimientoHandler(IFiltrosReporteQuery filtrosReporteQuery)
        {
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public Task<List<EstablecimientoDto>> Handle(ListarEstablecimientoCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetEstablecimientos(request.Disa, request.Red, request.MicroRed);
        }

        public Task<List<EstablecimientoDto>> Handle(ListarDatosEstablecimientoCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetDatosEstablecimiento(request.Establecimiento);
        }
    }
}
