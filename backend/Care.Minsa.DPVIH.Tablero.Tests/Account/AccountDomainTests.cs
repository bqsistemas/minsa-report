using Care.Minsa.DPVIH.Tablero.Core.Enums;
using Care.Minsa.DPVIH.Tablero.Tests.Data;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Xunit.Abstractions;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Core.Exceptions;

namespace Care.Minsa.DPVIH.Tablero.Tests
{
    [Trait("Category", "Account")]
    public class AccountDomainTests
    {
        private readonly ITestOutputHelper _output;
        public AccountDomainTests(ITestOutputHelper output)
        {
            _output = output;
        }

        [Theory]
        [MemberData(nameof(InternalBalanceByTransactionTestData.TestData), MemberType = typeof(InternalBalanceByTransactionTestData))]
        public void BalanceByTransaction(double initialBalance, double amount, double balanceExpected, TransactionType transactionType)
        {
            _output.WriteLine($"Initial Balance: {initialBalance} - Amount: {amount} - Balance Expected: {balanceExpected} - Transaction Type: {transactionType.ToString()}");

            Account account = new Account(Guid.NewGuid(), "123456", AccountType.CurrentAccount, initialBalance);

            account.SetBalanceByTransaction(amount, transactionType);

            Assert.Equal(balanceExpected, account.AvaibleBalance);
        }

        [Theory]
        [MemberData(nameof(InternalBalanceByTransactionTestData.TestDataLessThanZero), MemberType = typeof(InternalBalanceByTransactionTestData))]
        public void BalanceByTransaction_Amount_LessThan_Zero(double initialBalance, double amount, TransactionType transactionType)
        {
            _output.WriteLine($"Initial Balance: {initialBalance} - Amount: {amount} - Transaction Type: {transactionType.ToString()}");

            Account account = new Account(Guid.NewGuid(), "123456", AccountType.CurrentAccount, initialBalance);

            BusinessException exception = Assert.Throws<BusinessException>(() =>
            {
                account.SetBalanceByTransaction(amount, transactionType);
            });

            Assert.Equal("ARGUMENTS_ERROR", exception.Message);
        }

        [Theory]
        [MemberData(nameof(InternalBalanceByTransactionTestData.TestDataInsufficienceBalance), MemberType = typeof(InternalBalanceByTransactionTestData))]
        public void BalanceByTransaction_Amount_Insufficient_Balance(double initialBalance, double amount, TransactionType transactionType)
        {
            _output.WriteLine($"Initial Balance: {initialBalance} - Amount: {amount} - Transaction Type: {transactionType.ToString()}");

            Account account = new Account(Guid.NewGuid(), "123456", AccountType.CurrentAccount, initialBalance);

            BusinessException exception = Assert.Throws<BusinessException>(() =>
            {
                account.SetBalanceByTransaction(amount, transactionType);
            });

            Assert.Equal("INSUFFICIENT_BALANCE", exception.Message);
        }
    }
}
