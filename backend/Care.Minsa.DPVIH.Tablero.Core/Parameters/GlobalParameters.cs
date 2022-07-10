using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Parameters
{
    public class GlobalParameters : IGlobalParameters
    {
        public double LimitByDay => double.Parse(Environment.GetEnvironmentVariable("LIMIT_BY_DAY"));
    }
}
