using AutoMapper;
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
             * Report
             */
            // CreateMap<ReportSummaryRequest, ReportSummaryCommand>();

        }
    }
}
