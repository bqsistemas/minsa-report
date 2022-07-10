using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class GetClientCommand : IRequest<ClientDto>
    {
        public string IdentificationNumber { get; set; }
        public GetClientCommand(string identificatioNumber)
        {
            IdentificationNumber = identificatioNumber;
        }
    }
}
