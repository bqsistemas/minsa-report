using Care.Minsa.DPVIH.Tablero.Core.Specification;
using System;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System.Linq.Expressions;

namespace Care.Minsa.DPVIH.Tablero.Domain.Specifications
{
    public class AccountByNumberSpec : BaseSpecification<Account>
    {
        public string Number { get; private set; }

        public AccountByNumberSpec(string number)
        {
            Number = number;
        }

        public override Expression<Func<Account, bool>> Criteria()
        {
            return x => x.Number.ToUpper() == Number.ToUpper();
        }
    }
}
