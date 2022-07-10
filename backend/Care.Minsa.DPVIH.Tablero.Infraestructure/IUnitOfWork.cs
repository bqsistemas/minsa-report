using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public interface IUnitOfWork
    {
        ITbMaestroIngresoRepository TbMaestroIngresoRepository { get; }

        void SaveChanges();
        Task SaveChangesAsync();

    }
}
