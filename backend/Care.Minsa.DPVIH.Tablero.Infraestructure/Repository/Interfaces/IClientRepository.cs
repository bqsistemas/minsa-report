using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public interface IClientRepository : IBaseRepository<Client>
    {
        Task<Client> GetClientWithAccounts(Guid clientId);
    }
}
