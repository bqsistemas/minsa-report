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
using System.Linq;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class ClientHandler :
        IRequestHandler<CreateClientCommand, ClientDto>,
        IRequestHandler<UpdateClientCommand, ClientDto>,
        IRequestHandler<DeleteClientCommand, bool>,
        IRequestHandler<GetClientCommand, ClientDto>,
        IRequestHandler<ActivateClientCommand, bool>
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        public ClientHandler(
            IUnitOfWork context,
            IMapper mapper
            )
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ClientDto> Handle(CreateClientCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var existsClient = _context.ClientRepository.ExistBySpec(new ClientByIdentificationNumberSpec(request.IdentificationNumber));
            if (existsClient)
                throw new BusinessException("ALREADY_EXISTS_CLIENT");
            #endregion

            var client = _context.ClientRepository.Add(
                new Client(
                    request.Name,
                    request.Gender,
                    request.Age,
                    request.IdentificationNumber,
                    request.Address,
                    request.PhoneNumber,
                    request.Password)
            );

            await _context.SaveChangesAsync();
            return _mapper.Map<ClientDto>(client);
        }

        public async Task<ClientDto> Handle(UpdateClientCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var client = _context.ClientRepository.Find(new ClientByIdentificationNumberSpec(request.IdentificationNumber));
            if (client == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");
            #endregion

            client.SetNewData(request.Name, request.Gender, request.Age, request.Address, request.PhoneNumber);
            _context.ClientRepository.Update(client);

            await _context.SaveChangesAsync();
            return _mapper.Map<ClientDto>(client);
        }

        public async Task<bool> Handle(DeleteClientCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var client = _context.ClientRepository.Find(new ClientByIdentificationNumberSpec(request.IdentificationNumber));
            if (client == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");
            #endregion

            client.SetStatus(false);
            _context.ClientRepository.Update(client);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ClientDto> Handle(GetClientCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var client = _context.ClientRepository.Find(new ClientByIdentificationNumberSpec(request.IdentificationNumber));
            if (client == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");
            #endregion

            return _mapper.Map<ClientDto>(client);
        }

        public async Task<bool> Handle(ActivateClientCommand request, CancellationToken cancellationToken)
        {
            #region Business validations
            var client = _context.ClientRepository.Find(new ClientByIdentificationNumberSpec(request.IdentificationNumber));
            if (client == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");
            #endregion

            client.SetStatus(true);
            _context.ClientRepository.Update(client);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
