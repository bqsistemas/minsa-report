using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.ValueObjects
{
    public class MaestroIngresoFilter
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