
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public interface ITransactionRepository : IBaseRepository<Transaction>
    {
        double GetTotalAmountByDay(Guid accountId, Instant time);
        Task<List<TransactionSummaryDto>> GetSummaryByClient(string clientIdentification, Instant start, Instant end);
    }
}
