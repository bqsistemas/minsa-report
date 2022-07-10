using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ActivateAccountCommand : IRequest<bool>
    {
        public string AccountNumber { get; set; }
        public ActivateAccountCommand(string accountNumber)
        {
            AccountNumber = accountNumber;
        }
    }
}
