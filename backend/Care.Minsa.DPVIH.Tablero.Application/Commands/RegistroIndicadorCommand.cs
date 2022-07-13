using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class RegistroIndicadorCommand : IRequest<MaestroIngresoDto>
    {
        public string Anio { get; set; }
        public string Mes { get; set; }
        public int Disa { get; set; }
        public string Red { get; set; }
        public string Mred { get; set; }
        public int Renaes { get; set; }
        public string Dep { get; set; }
        public string Prov { get; set; }
        public string Dis { get; set; }
        public int Etapa { get; set; }
        public string Sexo { get; set; }
        public string Etnia { get; set; }
        public string VinPersonaEstimada { get; set; }
        public string ItsPersonaEstimadaTamizajeSifilis { get; set; }
        public string ItsPersonaEstimadaDiagnosticoIts { get; set; }
        public string TmiGestanteAtendidaVih { get; set; }
        public string TmiGestanteAtendidaSifilis { get; set; }
        public string TmiGestanteAtendidaHepatitisB { get; set; }
    }
}
