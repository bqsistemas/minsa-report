using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;
using Care.Minsa.DPVIH.Tablero.Core.Enums;

namespace Care.Minsa.DPVIH.Tablero.Domain.Entities
{
    public partial class Transaction
    {
        public Guid TransactionId { get; private set; }
        public Guid AccountId { get; private set; }
        public Account Account { get; private set; }
        public Instant Date { get; private set; }
        public TransactionType Type { get; private set; }
        public double Amount { get; private set; }
        public double Balance { get; private set; }
        public Transaction()
        {

        }
        public Transaction(
                Guid accountId,
                Instant date,
                TransactionType type,
                double amount,
                double balance
            )
        {
            AccountId = accountId;
            Date = date;
            Type = type;
            Amount = type == TransactionType.Deposit ? amount : (-1) * amount;
            Balance = balance;
        }
    }
}
