using Care.Minsa.DPVIH.Tablero.Core.Enums;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class TransactionSummaryDto
    {
        public Instant Date { get; set; }
        public string Client { get; set; }
        public string AccountNumber { get; set; }
        public AccountType AccountType { get; set; }
        public double InitialBalance { get; set; }
        public bool Status { get; set; }
        public double Transaction { get; set; }
        public double AvailableBalance { get; set; }
    }
}
