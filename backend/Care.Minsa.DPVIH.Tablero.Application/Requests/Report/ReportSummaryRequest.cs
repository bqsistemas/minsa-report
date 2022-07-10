using NodaTime;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class ReportSummaryRequest
    {
        [Required]
        public string Sexo { get; set; }
    }
}
