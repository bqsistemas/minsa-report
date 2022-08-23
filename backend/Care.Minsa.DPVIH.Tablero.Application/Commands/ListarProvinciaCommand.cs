using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ListarProvinciaCommand : IRequest<List<UbigeoDto>>
    {
        public string Disa { get; set; }
        public string Departamento { get; set; }
        public ListarProvinciaCommand(string disa, string departamento)
        {
            Disa = disa;
            Departamento = departamento;
        }
    }
}
