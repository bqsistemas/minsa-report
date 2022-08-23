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
        public string Disa { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public ListarDistritoCommand(string disa, string departamento, string provincia)
        {
            Disa = disa;
            Departamento = departamento;
            Provincia = provincia;
        }
    }
}
