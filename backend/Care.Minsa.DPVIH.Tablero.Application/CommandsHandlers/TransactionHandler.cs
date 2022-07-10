using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Exceptions;
using Care.Minsa.DPVIH.Tablero.Core.Parameters;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Domain.Specifications;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using MediatR;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class TransactionHandler :
        IRequestHandler<CreateTransactionCommand, TransactionDto>,
        IRequestHandler<UpdateTransactionCommand, TransactionDto>
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        private readonly IClock _clock;
        private readonly IGlobalParameters _globalParameters;
        public TransactionHandler(
            IUnitOfWork context,
            IMapper mapper,
            IClock clock,
            IGlobalParameters globalParameters
            )
        {
            _context = context;
            _mapper = mapper;
            _clock = clock;
            _globalParameters = globalParameters;
    }
        public async Task<TransactionDto> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            if(request.Amount > _globalParameters.LimitByDay && request.Type == Core.Enums.TransactionType.Withdrawal)
                throw new BusinessException("AMOUNT_EXCEEDS_DAILY_LIMIT");

            var account = _context.AccountRepository.Find(new AccountByNumberSpec(request.AccountNumber));
            if (account == null)
                throw new BusinessException("NOT_EXISTS_ACCOUNT");
            if (!account.Status)
                throw new BusinessException("ACCOUNT_DOES_NOT_ACTIVE");

            if(request.Type == Core.Enums.TransactionType.Withdrawal)
            {
                var amountByDay = _context.TransactionRepository.GetTotalAmountByDay(account.AccountId, _clock.GetCurrentInstant());
                if (amountByDay + request.Amount > _globalParameters.LimitByDay)
                    throw new BusinessException("DAILY_LIMIT_EXCEED", new
                    {
                        AmountAllowed = Math.Round(_globalParameters.LimitByDay - amountByDay, 2)
                    });
            }
            #endregion

            // update initial balance of account
            account.SetBalanceByTransaction(request.Amount, request.Type);
            _context.AccountRepository.Update(account);

            // add transaction with new initial balance
            var transaction = _context.TransactionRepository.Add(
                new Transaction(
                    account.AccountId,
                    _clock.GetCurrentInstant(),
                    request.Type,
                    request.Amount,
                    account.AvaibleBalance)
            );

            await _context.SaveChangesAsync();
            return _mapper.Map<TransactionDto>(transaction);
        }

        public Task<TransactionDto> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
