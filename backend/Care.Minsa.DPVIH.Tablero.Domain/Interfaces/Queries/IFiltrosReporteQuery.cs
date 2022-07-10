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
        Task<List<UbigeoDto>> GetDepartamentos();
        Task<List<UbigeoDto>> GetProvincias(string departamento);
        Task<List<UbigeoDto>> GetDistritos(string departamento, string provincia);
        Task<List<MesesDto>> GetMeses();

    }
}
