using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarEstablecimientoCommand : IRequest<List<EstablecimientoDto>>
    {
        public string Disa { get; set; }
        public string Red { get; set; }
        public string MicroRed { get; set; }
        public ListarEstablecimientoCommand(string disa, string red, string microred)
        {
            Disa = disa;
            Red = red;
            MicroRed = microred;
        }
    }
}
