using Care.Minsa.DPVIH.Tablero.Core.Specification;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected BackendBPDbContext _context;
        public BaseRepository(BackendBPDbContext context)
        {
            _context = context;
        }
        public virtual T Add(T entity)
        {
            return _context.Add(entity).Entity;
        }

        public virtual IEnumerable<T> All()
        {
            return _context.Set<T>()
                .ToList();
        }

        public virtual IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>()
                    .AsQueryable()
                    .Where(predicate);
        }

        public virtual T Find(BaseSpecification<T> spec)
        {
            return _context.Set<T>().Where(spec.Criteria()).FirstOrDefault();
        }

        public virtual IEnumerable<T> GetListBy(BaseSpecification<T> spec)
        {
            return _context.Set<T>().Where(spec.Criteria());
        }

        public virtual T Update(T entity)
        {
            return _context.Update(entity).Entity;
        }
        public virtual bool ExistBySpec(BaseSpecification<T> spec)
        {
            return _context.Set<T>().Any(spec.Criteria());
        }

        public virtual T Get(Guid id)
        {
            return _context.Find<T>(id);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
