using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarDistritoCommand : IRequest<List<UbigeoDto>>
    {
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public ListarDistritoCommand(string departamento, string provincia)
        {
            Departamento = departamento;
            Provincia = provincia;
        }
    }
}
