using Care.Minsa.DPVIH.Tablero.Core.Enums;
using NodaTime;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class CreateTransactionRequest
    {
        [Required]
        public string AccountNumber { get; set; }
        [Required]
        [EnumDataType(typeof(TransactionType))]
        public TransactionType Type { get; set; }
        [Required]
        public double Amount { get; set; }
    }
}
