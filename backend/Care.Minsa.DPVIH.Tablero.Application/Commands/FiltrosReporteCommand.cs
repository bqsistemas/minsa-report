using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class FiltrosReporteCommand : IRequest<List<MaestroIngresoDto>>
    {
        public MaestroIngresoFilter Filter { get; set; }
        public FiltrosReporteCommand(MaestroIngresoFilter filter)
        {
            Filter = filter;
        }
    }
}
