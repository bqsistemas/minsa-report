﻿using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using Care.Minsa.DPVIH.Tablero.Domain.Interfaces.Queries;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Dapper;
using System;
using System.Collections.Generic;
using Dapper;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Care.Minsa.DPVIH.Tablero.Core.Base;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Queries
{
    public class FiltrosReporteQuery : IFiltrosReporteQuery
    {
        private readonly DapperDbContext _context;
        public FiltrosReporteQuery(DapperDbContext context)
        {
            this._context = context;
        }
        public async Task<List<UbigeoDto>> GetDepartamentos(string disa)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa,
                    };

                    var sql = Resource.Query("Sql//Departamentos.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<UbigeoDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<UbigeoDto>> GetProvincias(string disa, string departamento)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa,
                        @departamento = departamento,
                    };

                    var sql = Resource.Query("Sql//Provincias.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<UbigeoDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<UbigeoDto>> GetDistritos(string disa, string departamento, string provincia)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa,
                        @departamento = departamento,
                        @provincia = provincia,
                    };
                    var sql = Resource.Query("Sql//Distritos.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<UbigeoDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<MesesDto>> GetMeses()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var sql = Resource.Query("Sql//Meses.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<MesesDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<PeriodoDto>> GetPeriodo()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var sql = Resource.Query("Sql//Periodo.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<PeriodoDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<DisaDto>> GetDisas()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {

                    var sql = Resource.Query("Sql//Disa.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<DisaDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<RedDto>> GetRedes(string disa)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa
                    };
                    var sql = Resource.Query("Sql//Red.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<RedDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<MicroRedDto>> GetMicroRedes(string disa, string red)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa,
                        @red = red
                    };
                    var sql = Resource.Query("Sql//MicroRed.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<MicroRedDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<EstablecimientoDto>> GetEstablecimientos(string disa, string red, string microred)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @disa = disa,
                        @red = red,
                        @microred = @microred
                    };
                    var sql = Resource.Query("Sql//Establecimiento.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<EstablecimientoDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<EstablecimientoDto>> GetDatosEstablecimiento(int establecimiento)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @establecimiento = establecimiento
                    };
                    var sql = Resource.Query("Sql//DatosEstablecimiento.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<EstablecimientoDto>(sql, parameters);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<GrupoEtarioDto>> GetGruposEtarios()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {

                    var sql = Resource.Query("Sql//GrupoEtario.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<GrupoEtarioDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<EtniaDto>> GetEtnias()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {

                    var sql = Resource.Query("Sql//Etnia.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<EtniaDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<TipoPoblacionDto>> GetTipoPoblacion()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {

                    var sql = Resource.Query("Sql//TipoPoblacion.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<TipoPoblacionDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<PagedResult<MaestroIngresoPagedDto>> GetMaestroIngresoPaged(string searchTerm, PagedFilter filter)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
                        @pageNumber = filter.Page,
                        @rowsPerPage = filter.PageSize
                    };

                    var sql = Resource.Query("Sql//MaestroIngresoPaged.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<MaestroIngresoPagedDto>(sql, parameters);

                    return new PagedResult<MaestroIngresoPagedDto>
                    {
                        Results = result.ToList(),
                        RowCount = result.ToList().Count > 0 ? result.ToList().FirstOrDefault().RowCount : 0,
                        PageSize = filter.PageSize,
                        CurrentPage = filter.Page
                    };
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
