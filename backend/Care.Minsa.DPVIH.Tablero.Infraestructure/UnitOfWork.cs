using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private BackendBPDbContext _context;
        public UnitOfWork(BackendBPDbContext context)
        {
            _context = context;
        }

        private IClientRepository _clientRepository;
        public IClientRepository ClientRepository
        {
            get
            {
                if (_clientRepository == null)
                {
                    _clientRepository = new ClientRepository(_context);
                }
                return _clientRepository;
            }
        }

        private IAccountRepository _accountRepository;
        public IAccountRepository AccountRepository
        {
            get
            {
                if (_accountRepository == null)
                {
                    _accountRepository = new AccountRepository(_context);
                }
                return _accountRepository;
            }
        }

        private ITransactionRepository _transactionRepository;
        public ITransactionRepository TransactionRepository
        {
            get
            {
                if (_transactionRepository == null)
                {
                    _transactionRepository = new TransactionRepository(_context);
                }
                return _transactionRepository;
            }
        }

        public void SaveChanges()
        {
            this._context.SaveChanges();
        }
        public async Task SaveChangesAsync()
        {
            await this._context.SaveChangesAsync();
        }
    }
}
