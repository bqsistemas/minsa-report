using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class CreateTransactionCommand : IRequest<TransactionDto>
    {
        public string AccountNumber { get; set; }
        public TransactionType Type { get; set; }
        public double Amount { get; set; }
    }
}
