using Care.Minsa.DPVIH.Tablero.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class UpdateAccountRequest
    {
        [Required]
        public string Number { get; set; }
        [Required]
        public AccountType Type { get; set; }
    }
}
