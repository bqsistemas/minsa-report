using Care.Minsa.DPVIH.Tablero.Core.Specification;
using System;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System.Linq.Expressions;

namespace Care.Minsa.DPVIH.Tablero.Domain.Specifications
{
    public class ClientByIdentificationNumberSpec : BaseSpecification<Client>
    {
        public string IdentificationNumber { get; private set; }

        public ClientByIdentificationNumberSpec(string identificationNumber)
        {
            IdentificationNumber = identificationNumber;
        }

        public override Expression<Func<Client, bool>> Criteria()
        {
            return x => x.IdentificationNumber.ToUpper() == IdentificationNumber.ToUpper();
        }
    }
}
