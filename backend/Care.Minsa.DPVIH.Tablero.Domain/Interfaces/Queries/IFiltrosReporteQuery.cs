using Care.Minsa.DPVIH.Tablero.Core.Base;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Domain.Interfaces.Queries
{
    public interface IFiltrosReporteQuery
    {
        Task<List<UbigeoDto>> GetDepartamentos(string disa);
        Task<List<UbigeoDto>> GetProvincias(string disa, string departamento);
        Task<List<UbigeoDto>> GetDistritos(string disa, string departamento, string provincia);
        Task<List<MesesDto>> GetMeses();
        Task<List<PeriodoDto>> GetPeriodo();
        Task<List<DisaDto>> GetDisas();
        Task<List<RedDto>> GetRedes(string disa);
        Task<List<MicroRedDto>> GetMicroRedes(string disa, string red);
        Task<List<EstablecimientoDto>> GetEstablecimientos(string disa, string red, string microred);
        Task<List<GrupoEtarioDto>> GetGruposEtarios();
        Task<List<EtniaDto>> GetEtnias();
        Task<List<TipoPoblacionDto>> GetTipoPoblacion();
        Task<PagedResult<MaestroIngresoPagedDto>> GetMaestroIngresoPaged(string searchTerm, PagedFilter filter);
    }
}