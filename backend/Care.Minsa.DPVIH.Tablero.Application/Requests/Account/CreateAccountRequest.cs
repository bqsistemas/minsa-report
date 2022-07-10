using Care.Minsa.DPVIH.Tablero.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class CreateAccountRequest
    {
        [Required]
        public string ClientIdentification { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        [EnumDataType(typeof(AccountType))]
        public AccountType Type { get; set; }
        [Required]
        public double InitialBalance { get; set; }
    }
}
