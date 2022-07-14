using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Base;
using AutoMapper;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public class TbMaestroIngresoRepository : BaseRepository<TbMaestroIngreso>, ITbMaestroIngresoRepository
    {
        public TbMaestroIngresoRepository(BackendBPDbContext context) : base(context)
        {
        }

        public PagedResult<TbMaestroIngreso> PagedQuery(string searchTerm, PagedFilter filter)
        {
            var pagedQuery = (
                                from maestro in _context.TbMaestroIngreso
                                select maestro
                            );

            return pagedQuery.GetPaged(filter);

        }
    }
}
