using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public class TbMaestroIngresoRepository : BaseRepository<TbMaestroIngreso>, ITbMaestroIngresoRepository
    {
        public TbMaestroIngresoRepository(BackendBPDbContext context) : base(context)
        {
        }
    }
}
