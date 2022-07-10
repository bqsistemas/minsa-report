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
    }
}
