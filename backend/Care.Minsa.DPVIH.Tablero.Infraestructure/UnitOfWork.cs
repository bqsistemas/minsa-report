using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private BackendBPDbContext _context;
        public UnitOfWork(BackendBPDbContext context)
        {
            _context = context;
        }

        private ITbMaestroIngresoRepository _tbMaestroIngresoRepository;
        public ITbMaestroIngresoRepository TbMaestroIngresoRepository
        {
            get
            {
                if (_tbMaestroIngresoRepository == null)
                {
                    _tbMaestroIngresoRepository = new TbMaestroIngresoRepository(_context);
                }
                return _tbMaestroIngresoRepository;
            }
        }

        public void SaveChanges()
        {
            this._context.SaveChanges();
        }
        public async Task SaveChangesAsync()
        {
            await this._context.SaveChangesAsync();
        }
    }
}
