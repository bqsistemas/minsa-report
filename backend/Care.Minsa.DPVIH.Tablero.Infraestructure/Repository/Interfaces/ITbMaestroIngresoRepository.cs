using Care.Minsa.DPVIH.Tablero.Core.Base;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public interface ITbMaestroIngresoRepository : IBaseRepository<TbMaestroIngreso>
    {
        PagedResult<TbMaestroIngreso> PagedQuery(string searchTerm, PagedFilter filter);
    }
}
