using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public class ClientRepository : BaseRepository<Client>, IClientRepository
    {
        public ClientRepository(BackendBPDbContext context) : base(context)
        {
        }
        public async Task<Client> GetClientWithAccounts(Guid clientId)
        {
            var client = await _context.Client
                                    .Where(x => x.ClientId == clientId)
                                    .Include(x => x.Accounts)
                                    .FirstOrDefaultAsync();

            return client;
        }
    }
}
