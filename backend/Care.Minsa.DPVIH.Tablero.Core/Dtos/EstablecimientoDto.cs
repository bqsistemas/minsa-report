﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Dtos
{
    public class EstablecimientoDto : MicroRedDto
    {
        public int Establecimiento { get; set; }
        public string EstablecimientoDsc { get; set; }
        public string Ubigeo { get; set; }
    }
}
