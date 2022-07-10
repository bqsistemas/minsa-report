using Care.Minsa.DPVIH.Tablero.Core.Crypt;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Care.Minsa.DPVIH.Tablero.Tests
{
    [Trait("Category", "Client")]
    public class ClientDomainTests
    {
        [Fact]
        public void VerifyPasswordHash()
        {
            string hashPassword = HashMaker.HashPassword("1234");
            Assert.True(HashMaker.VerifyPassword(hashPassword, "1234"));
        }
        [Fact]
        public void VerifyPasswordHash_Failed()
        {
            string hashPassword = HashMaker.HashPassword("1234");
            Assert.False(HashMaker.VerifyPassword(hashPassword, "abcd"));
        }
    }
}
