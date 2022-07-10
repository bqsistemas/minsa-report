using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Care.Minsa.DPVIH.Tablero.Core.Enums;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class CreateClientRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        [EnumDataType(typeof(GenderType))]
        public GenderType Gender { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public string IdentificationNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
