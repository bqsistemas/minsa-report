using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class MaestroIngresoDto
    {
        public string Anio { get; set; }
        public string Mes { get; set; }
        public string MesDsc { get; set; }
        public string Departamento { get; set; }
        public string DepartamentoDsc { get; set; }
        public string Provincia { get; set; }
        public string ProvinciaDsc { get; set; }
        public string Distrito { get; set; }
        public string DistritoDsc { get; set; }
        public string Sexo { get; set; }
        public string SexoDsc { get; set; }
    }
}
