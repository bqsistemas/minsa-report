using NodaTime;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class ReportSummaryRequest
    {
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string TipoPoblacion { get; set; }
        public string GrupoEtario { get; set; }
        public string Sexo { get; set; }
        public string Mes { get; set; }
        public string Periodo { get; set; }
    }
}
