using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public interface IUnitOfWork
    {
        IClientRepository ClientRepository { get; }
        IAccountRepository AccountRepository { get; }
        ITransactionRepository TransactionRepository { get; }

        void SaveChanges();
        Task SaveChangesAsync();

    }
}
