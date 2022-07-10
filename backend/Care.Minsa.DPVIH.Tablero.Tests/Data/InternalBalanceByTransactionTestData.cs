using Care.Minsa.DPVIH.Tablero.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Tests.Data
{
    public class InternalBalanceByTransactionTestData
    {
        private static readonly List<object[]> Data = new List<object[]>
             {
                    new object[] {0, 1000, 1000, TransactionType.Deposit},
                    new object[] {2000, 100, 1900, TransactionType.Withdrawal},
                    new object[] {2000, 100, 2100, TransactionType.Deposit},
                    new object[] {2000, 2000, 0, TransactionType.Withdrawal}
             };

        private static readonly List<object[]> DataLessThanZero = new List<object[]>
             {
                    new object[] {0, -1000, TransactionType.Deposit},
                    new object[] {2000, -100, TransactionType.Withdrawal},
                    new object[] {2000, -100, TransactionType.Deposit},
                    new object[] {2000, -2000, TransactionType.Withdrawal}
             };

        private static readonly List<object[]> DataInsufficientBalance = new List<object[]>
             {
                    new object[] {0, 1000, TransactionType.Withdrawal},
                    new object[] {1000, 1001, TransactionType.Withdrawal}
             };

        public static IEnumerable<object[]> TestData => Data;
        public static IEnumerable<object[]> TestDataLessThanZero => DataLessThanZero;
        public static IEnumerable<object[]> TestDataInsufficienceBalance => DataInsufficientBalance;
    }
}
