using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarRedCommand : IRequest<List<RedDto>>
    {
        public string Disa { get; set; }
        public ListarRedCommand(string disa)
        {
            Disa = disa;
        }
    }
}
