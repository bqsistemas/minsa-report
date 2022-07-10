using System;
using System.Collections.Generic;
using System.Text;
using Care.Minsa.DPVIH.Tablero.Core.Enums;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class ClientDto
    {
        public Guid ClientId { get; set; }
        public string Name { get; set; }
        public GenderType Gender { get; set; }
        public int Age { get; set; }
        public string IdentificationNumber { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool Status { get; set; }
    }
}
