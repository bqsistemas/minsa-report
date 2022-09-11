using Care.Minsa.DPVIH.Tablero.Core.Enums;
using NodaTime;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests
{
    public class ReportSummaryRequest
    {
        public string Disa { get; set; }
        public string Red { get; set; }
        public string MicroRed { get; set; }
        public string Establecimiento { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Etnia { get; set; }
        public string TipoPoblacion { get; set; }
        public int GrupoEtario { get; set; }
        public string Sexo { get; set; }
        public string Anio { get; set; }
        public string Mes { get; set; }
        public MinsaReportType ReportType { get; set; }
    }
}
