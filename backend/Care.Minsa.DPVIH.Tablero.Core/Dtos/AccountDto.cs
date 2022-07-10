using Care.Minsa.DPVIH.Tablero.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class AccountDto
    {
        public Guid AccountId { get; set; }
        public string Number { get; set; }
        public double InitialBalance { get; set; }
        public double AvailableBalance { get; set; }
        public AccountType Type { get; set; }
        public bool Status { get; set; }
    }
}
