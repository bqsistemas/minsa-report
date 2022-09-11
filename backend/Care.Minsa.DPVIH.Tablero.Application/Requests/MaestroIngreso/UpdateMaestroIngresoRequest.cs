using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Requests.MaestroIngreso
{
    public class UpdateMaestroIngresoRequest
    {
        public int IdMaestroIngreso { get; set; }
        public int Disa { get; set; }
        public string Red { get; set; }
        public string Mred { get; set; }
        public int Renaes { get; set; }
        public string Anio { get; set; }
        public string Mes { get; set; }
        public string Dep { get; set; }
        public string Prov { get; set; }
        public string Dis { get; set; }
        public int Etapa { get; set; }
        public string Sexo { get; set; }
        public string Etnia { get; set; }
        public string TipoPoblacion { get; set; }
        public int VinPersonaEstimada { get; set; }
        public int ItsPersonaEstimadaTamizajeSifilis { get; set; }
        public int ItsPersonaEstimadaDiagnosticoIts { get; set; }
        public int TmiGestanteAtendidaVih { get; set; }
        public int TmiGestanteAtendidaSifilis { get; set; }
        public int TmiGestanteAtendidaHepatitisB { get; set; }
    }
}
