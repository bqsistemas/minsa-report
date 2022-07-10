using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Specification
{
    public interface IBaseSpecification<TEntity> where TEntity : class
    {
        Expression<Func<TEntity, bool>> Criteria();
    }
}
