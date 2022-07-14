using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Base;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.Exceptions;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Domain.Interfaces.Queries;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    public class MaestroIngresoHandler :
        IRequestHandler<RegistroIndicadorCommand, MaestroIngresoDto>,
        IRequestHandler<EditarIndicadorCommand, MaestroIngresoDto>,
        IRequestHandler<EliminarIndicadorCommand, bool>,
        IRequestHandler<ObtenerIndicadorCommand, MaestroIngresoDto>,
        IRequestHandler<ListarPaginadoIndicadorCommand, PagedResult<MaestroIngresoPagedDto>>
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        private readonly IFiltrosReporteQuery _filtrosReporteQuery;

        public MaestroIngresoHandler(
            IUnitOfWork context,
            IMapper mapper,
            IFiltrosReporteQuery filtrosReporteQuery
            )
        {
            _context = context;
            _mapper = mapper;
            _filtrosReporteQuery = filtrosReporteQuery;
        }

        public async Task<MaestroIngresoDto> Handle(RegistroIndicadorCommand request, CancellationToken cancellationToken)
        {
            var maestroIngreso = _context.TbMaestroIngresoRepository.Add(_mapper.Map<TbMaestroIngreso>(request));

            await _context.SaveChangesAsync();
            return _mapper.Map<MaestroIngresoDto>(maestroIngreso);
        }

        public async Task<MaestroIngresoDto> Handle(EditarIndicadorCommand request, CancellationToken cancellationToken)
        {
            var maestroIngreso = _context.TbMaestroIngresoRepository.Get(request.IdMaestroIngreso);
            if (maestroIngreso == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");

            maestroIngreso.Anio = request.Anio;
            maestroIngreso.Mes = request.Mes;
            maestroIngreso.Disa = request.Disa;
            maestroIngreso.Red = request.Red;
            maestroIngreso.Mred = request.Mred;
            maestroIngreso.Renaes = request.Renaes;
            maestroIngreso.Dep = request.Dep;
            maestroIngreso.Prov = request.Prov;
            maestroIngreso.Dis = request.Dis;
            maestroIngreso.Etapa = request.Etapa;
            maestroIngreso.Sexo = request.Sexo;
            maestroIngreso.Etnia = request.Etnia;
            maestroIngreso.VinPersonaEstimada = request.VinPersonaEstimada;
            maestroIngreso.ItsPersonaEstimadaTamizajeSifilis = request.ItsPersonaEstimadaTamizajeSifilis;
            maestroIngreso.ItsPersonaEstimadaDiagnosticoIts = request.ItsPersonaEstimadaDiagnosticoIts;
            maestroIngreso.TmiGestanteAtendidaVih = request.TmiGestanteAtendidaVih;
            maestroIngreso.TmiGestanteAtendidaSifilis = request.TmiGestanteAtendidaSifilis;
            maestroIngreso.TmiGestanteAtendidaHepatitisB = request.TmiGestanteAtendidaHepatitisB;

            _context.TbMaestroIngresoRepository.Update(maestroIngreso);

            await _context.SaveChangesAsync();
            return _mapper.Map<MaestroIngresoDto>(maestroIngreso);
        }

        public async Task<bool> Handle(EliminarIndicadorCommand request, CancellationToken cancellationToken)
        {
            var maestroIngreso = _context.TbMaestroIngresoRepository.Get(request.IdMaestroIngreso);
            if (maestroIngreso == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");

            _context.TbMaestroIngresoRepository.Delete(maestroIngreso);

            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }

        public async Task<MaestroIngresoDto> Handle(ObtenerIndicadorCommand request, CancellationToken cancellationToken)
        {
            var maestroIngreso = _context.TbMaestroIngresoRepository.Get(request.IdMaestroIngreso);
            if (maestroIngreso == null)
                throw new BusinessException("NOT_EXISTS_CLIENT");

            return _mapper.Map<MaestroIngresoDto>(maestroIngreso);
        }

        public async Task<PagedResult<MaestroIngresoPagedDto>> Handle(ListarPaginadoIndicadorCommand request, CancellationToken cancellationToken)
        {
            var result = await _filtrosReporteQuery.GetMaestroIngresoPaged(request.Filter.SearchTerm, request.Filter);
            return result;
        }
    }
}
