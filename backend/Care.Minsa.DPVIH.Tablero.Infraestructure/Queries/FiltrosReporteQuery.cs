using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Core.ValueObjects;
using Care.Minsa.DPVIH.Tablero.Domain.Interfaces.Queries;
using Care.Minsa.DPVIH.Tablero.Infraestructure.Dapper;
using System;
using System.Collections.Generic;
using Dapper;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Queries
{
    public class FiltrosReporteQuery : IFiltrosReporteQuery
    {
        private readonly DapperDbContext _context;
        public FiltrosReporteQuery(DapperDbContext context)
        {
            this._context = context;
        }

        public async Task<List<UbigeoDto>> GetDepartamentos()
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {

                    var sql = Resource.Query("Sql//Departamentos.sql"); // on windows Sql//Demo.sql
                    var result = await connection.QueryAsync<UbigeoDto>(sql);
                    return result.ToList();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<List<UbigeoDto>> GetProvincias(string departamento)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
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

        public async Task<List<UbigeoDto>> GetDistritos(string departamento, string provincia)
        {
            try
            {
                using (var connection = _context.CreateConnection())
                {
                    var parameters = new
                    {
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
    }
}
