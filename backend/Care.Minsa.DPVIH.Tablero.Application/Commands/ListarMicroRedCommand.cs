using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarMicroRedCommand : IRequest<List<MicroRedDto>>
    {
        public string Disa { get; set; }
        public string Red { get; set; }
        public ListarMicroRedCommand(string disa, string red)
        {
            Disa = disa;
            Red = red;
        }
    }
}
