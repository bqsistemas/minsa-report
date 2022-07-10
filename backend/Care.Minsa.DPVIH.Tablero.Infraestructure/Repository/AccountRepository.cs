using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(BackendBPDbContext context) : base(context)
        {
        }
    }
}
