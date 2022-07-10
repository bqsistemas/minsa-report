using Care.Minsa.DPVIH.Tablero.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class UpdateTransactionRequest
    {
        [Required]
        public string TransactionId { get; set; }
        [Required]
        public double Amount { get; set; }
    }
}
