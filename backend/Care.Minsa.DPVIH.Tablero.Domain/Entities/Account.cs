using System;
using System.Collections.Generic;
using System.Text;
using Care.Minsa.DPVIH.Tablero.Core.Enums;
using Care.Minsa.DPVIH.Tablero.Core.Exceptions;

namespace Care.Minsa.DPVIH.Tablero.Domain.Entities
{
    public partial class Account
    {
        public Guid AccountId { get; private set; }
        public Guid ClientId { get; private set; }
        public Client Client { get; private set; }
        public string Number { get; private set; }
        public AccountType Type { get; private set; }
        public double InitialBalance { get; private set; }
        public double AvaibleBalance { get; private set; }
        public bool Status { get; private set; }
        public List<Transaction> Transactions { get; private set; }

        public Account()
        {

        }
        public Account(
                Guid clientId,
                string number,
                AccountType type,
                double initialBalance
            )
        {
            ClientId = clientId;
            Number = number;
            Type = type;
            InitialBalance = initialBalance;
            AvaibleBalance = initialBalance;
            Status = true;
        }

        public void SetType(AccountType type)
        {
            Type = type;
        }

        public void SetStatus(bool status)
        {
            Status = status;
        }
        public void SetBalanceByTransaction(double amount, TransactionType transactionType)
        {
            if(amount < 0)
                throw new BusinessException("ARGUMENTS_ERROR");

            if (transactionType == TransactionType.Withdrawal)
            {
                if(amount <= AvaibleBalance) AvaibleBalance -= amount;
                else throw new BusinessException("INSUFFICIENT_BALANCE");
            }
            if (transactionType == TransactionType.Deposit)
            {
                AvaibleBalance += amount;
            }
        }
    }
}
