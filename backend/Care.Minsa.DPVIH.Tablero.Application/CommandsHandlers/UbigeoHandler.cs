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
    public class UbigeoHandler :
        IRequestHandler<ListarDepartamentoCommand, List<UbigeoDto>>,
        IRequestHandler<ListarProvinciaCommand, List<UbigeoDto>>,
        IRequestHandler<ListarDistritoCommand, List<UbigeoDto>>
    {
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;
        public UbigeoHandler(IFiltrosReporteQuery filtrosReporteQuery)
        {
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public Task<List<UbigeoDto>> Handle(ListarDepartamentoCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetDepartamentos(request.Disa);
        }

        public Task<List<UbigeoDto>> Handle(ListarProvinciaCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetProvincias(request.Disa, request.Departamento);
        }

        public Task<List<UbigeoDto>> Handle(ListarDistritoCommand request, CancellationToken cancellationToken)
        {
            return _filtrosReporteQuery.GetDistritos(request.Disa, request.Departamento, request.Provincia);
        }
    }
}
