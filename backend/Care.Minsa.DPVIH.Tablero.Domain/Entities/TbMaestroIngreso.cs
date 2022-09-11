using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Domain.Entities
{
    [Table("TB_MAESTRO_INGRESO")]
    public class TbMaestroIngreso
    {
        [Column("id_maestro_ingreso")]
        public int IdMaestroIngreso { get; set; }
        [Column("anio")]
        public string Anio { get; set; }
        [Column("mes")]
        public string Mes { get; set; }
        [Column("disa")]
        public int Disa { get; set; }
        [Column("red")]
        public string Red { get; set; }
        [Column("mred")]
        public string Mred { get; set; }
        [Column("renaes")]
        public int Renaes { get; set; }
        [Column("dep")]
        public string Dep { get; set; }
        [Column("prov")]
        public string Prov { get; set; }
        [Column("dist")]
        public string Dis { get; set; }
        [Column("etapa")]
        public int Etapa { get; set; }
        [Column("sexo")]
        public string Sexo { get; set; }
        [Column("etnia")]
        public string Etnia { get; set; }
        [Column("tipopoblacion")]
        public string TipoPoblacion { get; set; }
        [Column("vih_persona_estimada")]
        public int VinPersonaEstimada { get; set; }
        [Column("its_persona_estimada_tamizaje_sifilis")]
        public int ItsPersonaEstimadaTamizajeSifilis { get; set; }
        [Column("its_persona_estimada_diagnostico_its")]
        public int ItsPersonaEstimadaDiagnosticoIts { get; set; }
        [Column("tmi_gestante_atendida_vih")]
        public int TmiGestanteAtendidaVih { get; set; }
        [Column("tmi_gestante_atendida_sifilis")]
        public int TmiGestanteAtendidaSifilis { get; set; }
        [Column("tmi_gestante_atendida_hepatitis_b")]
        public int TmiGestanteAtendidaHepatitisB { get; set; }
    }
}
