using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            /*
            *  Client
            */
            CreateMap<CreateClientRequest, CreateClientCommand>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.ToUpper().Trim()))
                .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.IdentificationNumber.Trim()));
            CreateMap<UpdateClientRequest, UpdateClientCommand>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.ToUpper().Trim()))
                .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.IdentificationNumber.Trim()));
            CreateMap<Client, ClientDto>();

            /*
            *  Account
            */
            CreateMap<CreateAccountRequest, CreateAccountCommand>()
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Number.ToUpper().Trim()))
                .ForMember(dest => dest.ClientIdentification, opt => opt.MapFrom(src => src.ClientIdentification.Trim()));
            CreateMap<UpdateAccountRequest, UpdateAccountCommand>()
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Number.ToUpper().Trim()));
            CreateMap<Account, AccountDto>();

            /*
            *  Transaction
            */
            CreateMap<CreateTransactionRequest, CreateTransactionCommand>()
                .ForMember(dest => dest.AccountNumber, opt => opt.MapFrom(src => src.AccountNumber.ToUpper().Trim()));
            CreateMap<UpdateTransactionRequest, UpdateTransactionCommand>();
            CreateMap<Transaction, TransactionDto>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString()));

            /*
             * Report
             */
            CreateMap<ReportSummaryRequest, ReportSummaryCommand>();

        }
    }
}
