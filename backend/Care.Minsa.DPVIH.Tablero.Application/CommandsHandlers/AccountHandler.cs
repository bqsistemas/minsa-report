using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Exceptions;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Domain.Specifications;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class AccountHandler :
        IRequestHandler<CreateAccountCommand, AccountDto>,
        IRequestHandler<UpdateAccountCommand, AccountDto>,
        IRequestHandler<DeleteAccountCommand, bool>,
        IRequestHandler<GetAccountCommand, AccountDto>,
        IRequestHandler<ActivateAccountCommand, bool>
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        public AccountHandler(
            IUnitOfWork context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<AccountDto> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var client = _context.ClientRepository.Find(new ClientByIdentificationNumberSpec(request.ClientIdentification));
            if (client == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");
            if (!client.Status)
                throw new BusinessException("CLIENT_DOES_NOT_ACTIVE");

            var existsAccount = _context.AccountRepository.ExistBySpec(new AccountByNumberSpec(request.Number));
            if (existsAccount)
                throw new BusinessException("ALREADY_EXISTS_ACCOUNT");
            #endregion

            var account = _context.AccountRepository.Add(
                new Account(
                    client.ClientId,
                    request.Number,
                    request.Type,
                    request.InitialBalance)
            );

            await _context.SaveChangesAsync();
            return _mapper.Map<AccountDto>(account);
        }

        public async Task<AccountDto> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var account = _context.AccountRepository.Find(new AccountByNumberSpec(request.Number));
            if (account == null)
                throw new BusinessException("NOT_EXISTS_ACCOUNT");
            if (!account.Status)
                throw new BusinessException("ACCOUNT_DOES_NOT_ACTIVE");
            #endregion

            account.SetType(request.Type);
            _context.AccountRepository.Update(account);

            await _context.SaveChangesAsync();
            return _mapper.Map<AccountDto>(account);
        }

        public async Task<bool> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var account = _context.AccountRepository.Find(new AccountByNumberSpec(request.AccountNumber));
            if (account == null)
                throw new BusinessException("NOT_EXISTS_ACCOUNT");
            #endregion

            account.SetStatus(false);
            _context.AccountRepository.Update(account);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<AccountDto> Handle(GetAccountCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var account = _context.AccountRepository.Find(new AccountByNumberSpec(request.Number));
            if (account == null)
                throw new BusinessException("NOT_EXISTS_ACCOUNT");
            #endregion

            return _mapper.Map<AccountDto>(account);
        }

        public async Task<bool> Handle(ActivateAccountCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var account = _context.AccountRepository.Find(new AccountByNumberSpec(request.AccountNumber));
            if (account == null)
                throw new BusinessException("NOT_EXISTS_ACCOUNT");
            #endregion

            account.SetStatus(true);
            _context.AccountRepository.Update(account);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
