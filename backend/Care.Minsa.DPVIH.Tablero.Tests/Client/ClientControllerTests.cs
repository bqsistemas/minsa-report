using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Repository;
using Moq;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace Care.Minsa.DPVIH.Tablero.Tests
{
    [Trait("Category", "Client")]
    public class ClientControllerTests
    {
        public IMapper _mapper;
        public Mock<IUnitOfWork> _context;
        public ClientControllerTests()
        {
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<MappingProfile>();
            });

            _mapper = mapperConfig.CreateMapper();
            _context = new Mock<IUnitOfWork>();


            // UnitOfWorl / Repository
            #region Client
            var clients = new List<Client>();
            var clientRepository = new Mock<IClientRepository>();
            clientRepository.Setup(r => r.Add(It.IsAny<Client>())).Returns((Client client) => {
                clients.Add(client);
                return client;
            });
            #endregion

            _context.Setup(r => r.ClientRepository).Returns(clientRepository.Object);
        }

        [Fact]
        public async void CreateClient()
        {
            var request = new CreateClientRequest()
            {
                IdentificationNumber = "46862309",
                Address = "Jiron Huiracocha 1430 - Jesús María",
                Age = 31,
                Gender = Core.Enums.GenderType.Male,
                Name = "Jhon Barrantes",
                Password = "1234",
                PhoneNumber = "975816043"
            };

            var handler = new ClientHandler(_context.Object, _mapper);

            var result = await handler.Handle(_mapper.Map<CreateClientCommand>(request), CancellationToken.None);
            Assert.IsType<ClientDto>(result);
        }
    }
}
