using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Core.Crypt;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Domain.Specifications;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using Moq;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace Care.Minsa.DPVIH.Tablero.Tests
{
    [Trait("Category", "Account")]
    public class AccountControllerTests
    {
        public IMapper _mapper;
        public Mock<IUnitOfWork> _context;
        public AccountControllerTests()
        {
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<MappingProfile>();
            });

            _mapper = mapperConfig.CreateMapper();
            _context = new Mock<IUnitOfWork>();


            // UnitOfWorl / Repository
            #region Client
            var clients = new List<Client>()
            {
                new Client("46862309", Core.Enums.GenderType.Male, 31, "46862309", "Jiron Huiracocha 1430 - Jesús María", "975816043", "1234")
            };
            var clientRepository = new Mock<IClientRepository>();
            clientRepository.Setup(r => r.Find(It.IsAny<ClientByIdentificationNumberSpec>())).Returns((ClientByIdentificationNumberSpec spec) => {
                return clients.Find(x => x.IdentificationNumber == spec.IdentificationNumber);
            });
            #endregion
            #region Account
            var accounts = new List<Account>();
            var accountRepository = new Mock<IAccountRepository>();
            accountRepository.Setup(r => r.Add(It.IsAny<Account>())).Returns((Account account) => {
                accounts.Add(account);
                return account;
            });
            #endregion

            _context.Setup(r => r.ClientRepository).Returns(clientRepository.Object);
            _context.Setup(r => r.AccountRepository).Returns(accountRepository.Object);
        }

        [Fact]
        public async void CreateAccount()
        {
            var request = new CreateAccountRequest()
            {
                ClientIdentification = "46862309",
                InitialBalance = 1000,
                Number = "123456789",
                Type = Core.Enums.AccountType.CurrentAccount
            };

            var handler = new AccountHandler(_context.Object, _mapper);

            var result = await handler.Handle(_mapper.Map<CreateAccountCommand>(request), CancellationToken.None);
            Assert.IsType<AccountDto>(result);
        }
    }
}
