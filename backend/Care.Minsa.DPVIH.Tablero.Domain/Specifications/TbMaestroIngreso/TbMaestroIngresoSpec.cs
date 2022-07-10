using Care.Minsa.DPVIH.Tablero.Core.Specification;
using System;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System.Linq.Expressions;

namespace Care.Minsa.DPVIH.Tablero.Domain.Specifications
{
    public class TbMaestroIngresoSpec : BaseSpecification<TbMaestroIngreso>
    {

        public TbMaestroIngresoSpec()
        {
        }

        public override Expression<Func<TbMaestroIngreso, bool>> Criteria()
        {
            return null;
        }
    }
}
