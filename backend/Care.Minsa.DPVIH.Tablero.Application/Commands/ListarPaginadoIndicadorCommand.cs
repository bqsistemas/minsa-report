using Care.Minsa.DPVIH.Tablero.Application.Requests.MaestroIngreso;
using Care.Minsa.DPVIH.Tablero.Core.Base;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarPaginadoIndicadorCommand : IRequest<PagedResult<MaestroIngresoPagedDto>>
    {
        public MaestroIngresoPagedRequest Filter { get; set; }
        public ListarPaginadoIndicadorCommand(MaestroIngresoPagedRequest filter)
        {
            Filter = filter;
        }
    }
}
