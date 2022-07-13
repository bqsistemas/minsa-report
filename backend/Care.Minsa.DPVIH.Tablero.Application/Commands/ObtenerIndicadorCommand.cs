using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ObtenerIndicadorCommand : IRequest<MaestroIngresoDto>
    {
        public int IdMaestroIngreso { get; set; }
        public ObtenerIndicadorCommand(int idMaestroIngreso)
        {
            IdMaestroIngreso = idMaestroIngreso;
        }
    }
}
