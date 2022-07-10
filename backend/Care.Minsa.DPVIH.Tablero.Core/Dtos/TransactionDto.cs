using Care.Minsa.DPVIH.Tablero.Core.Enums;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class TransactionDto
    {
        public Guid TransactionId { get; private set; }
        public string Date { get; private set; }
        public TransactionType Type { get; private set; }
        public double Amount { get; private set; }
        public double Balance { get; private set; }
    }
}
