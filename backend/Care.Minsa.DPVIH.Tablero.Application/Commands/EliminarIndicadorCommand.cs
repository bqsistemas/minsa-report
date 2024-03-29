﻿using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class EliminarIndicadorCommand : IRequest<bool>
    {
        public int IdMaestroIngreso { get; set; }
        public EliminarIndicadorCommand (int idMaestroIngreso)
        {
            IdMaestroIngreso = idMaestroIngreso;
        }
    }
}
