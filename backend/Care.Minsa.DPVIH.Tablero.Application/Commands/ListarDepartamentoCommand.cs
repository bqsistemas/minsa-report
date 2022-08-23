using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarDepartamentoCommand : IRequest<List<UbigeoDto>>
    {
        public string Disa { get; set; }
        public ListarDepartamentoCommand(string disa)
        {
            Disa = disa;
        }
    }
}
