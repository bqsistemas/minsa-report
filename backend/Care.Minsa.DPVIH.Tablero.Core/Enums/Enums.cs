using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Core.Enums
{
    public enum GenderType
    {
        Male = 1,
        Female = 2,
        Other = 3,
    }
    public enum AccountType
    {
        CurrentAccount = 1,
        SavingAccount = 2,
        SalaryAccount = 3,
        FixedDepositAccount = 4,
        OtherAccount = 5
    }
    public enum TransactionType
    {
        Deposit = 1,
        Withdrawal = 2
    }
}
