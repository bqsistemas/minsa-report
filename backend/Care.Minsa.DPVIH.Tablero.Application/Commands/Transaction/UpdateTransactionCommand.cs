using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class UpdateTransactionCommand : IRequest<TransactionDto>
    {
        public string TransactionId { get; set; }
        public double Amount { get; set; }
    }
}
