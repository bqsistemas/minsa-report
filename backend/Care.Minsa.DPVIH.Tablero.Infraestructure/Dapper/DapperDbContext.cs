using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Dapper
{
    public class DapperDbContext
    {
        private readonly IConfiguration _configuration;
        private string _connectionString { get; set; }
        public DapperDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("Database");
        }
        public IDbConnection CreateConnection()
        {
            return new SqlConnection(this._connectionString);
        }
    }
}
