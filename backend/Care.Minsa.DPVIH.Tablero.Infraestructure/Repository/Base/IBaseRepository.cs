using Care.Minsa.DPVIH.Tablero.Core.Specification;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public interface IBaseRepository<T> where T : class
    {
        T Add(T entity);
        T Update(T entity);
        T Get(int id);
        void Delete(T entity);
        IEnumerable<T> All();
        IEnumerable<T> GetListBy(BaseSpecification<T> spec);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        T Find(BaseSpecification<T> spec);
        bool ExistBySpec(BaseSpecification<T> spec);
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
