using Care.Minsa.DPVIH.Tablero.Core.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class MaestroIngresoPagedDto : PagedResultBase
    {
        public int IdMaestroIngreso { get; set; }
        public string Anio { get; set; }
        public string Mes { get; set; }
        public string Disa { get; set; }
        public string Red { get; set; }
        public string Mred { get; set; }
        public string Renaes { get; set; }
    }
}
