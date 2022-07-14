using Care.Minsa.DPVIH.Tablero.Core.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests.MaestroIngreso
{
    public class MaestroIngresoPagedRequest : PagedFilter
    {
        public string SearchTerm { get; set; }
    }
}
