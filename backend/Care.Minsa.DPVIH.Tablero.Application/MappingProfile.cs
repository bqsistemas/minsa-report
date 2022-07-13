using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Application.Requests.MaestroIngreso;
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
             * Report
             */
            CreateMap<CreateMaestroIngresoRequest, RegistroIndicadorCommand>();
            CreateMap<UpdateMaestroIngresoRequest, EditarIndicadorCommand>();
            CreateMap<RegistroIndicadorCommand, TbMaestroIngreso>();
            CreateMap<UpdateMaestroIngresoRequest, TbMaestroIngreso>();
            CreateMap<TbMaestroIngreso, MaestroIngresoDto>();
        }
    }
}
