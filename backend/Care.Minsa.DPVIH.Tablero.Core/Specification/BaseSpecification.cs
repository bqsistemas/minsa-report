using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Specification
{
    public abstract class BaseSpecification<T> : IBaseSpecification<T> where T : class
    {
        public abstract Expression<Func<T, bool>> Criteria();
    }
}
