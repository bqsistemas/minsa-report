using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class GetAccountCommand : IRequest<AccountDto>
    {
        public string Number { get; set; }
        public GetAccountCommand(string number)
        {
            Number = number;
        }
    }
}
