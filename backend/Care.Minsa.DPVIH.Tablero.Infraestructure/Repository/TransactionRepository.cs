using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Care.Minsa.DPVIH.Tablero.Domain.Specifications;
using Care.Minsa.DPVIH.Tablero.Infraestructure.EFCore;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Infraestructure.Repository
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(BackendBPDbContext context) : base(context)
        {
        }

        public double GetTotalAmountByDay(Guid accountId, Instant time)
        {
            var transactions = GetListBy(new TransactionByAccountDateSpec(accountId, time, Core.Enums.TransactionType.Withdrawal));
            return transactions.Sum(x => Math.Abs(x.Amount));
        }
        public async Task<List<TransactionSummaryDto>> GetSummaryByClient(string clientIdentification, Instant start, Instant end)
        {
            DateTimeZone tz = DateTimeZoneProviders.Tzdb.GetSystemDefault();
            ZonedDateTime startDay = tz.AtStartOfDay(start.InZone(tz).Date);
            ZonedDateTime endDay = tz.AtStartOfDay(end.InZone(tz).Date.PlusDays(1));

            var summary = await _context.Transaction.AsNoTracking()
                                    .Where(x => x.Date >= startDay.ToInstant() && x.Date < endDay.ToInstant())
                                    .Include(x => x.Account)
                                    .ThenInclude(x => x.Client)
                                    .Where(x => x.Account.Client.IdentificationNumber == clientIdentification.Trim())
                                    .Select(x => new TransactionSummaryDto() { 
                                        Date = x.Date,
                                        Client = x.Account.Client.Name,
                                        AccountNumber = x.Account.Number,
                                        AccountType = x.Account.Type,
                                        InitialBalance = x.Account.InitialBalance,
                                        Transaction = x.Amount,
                                        AvailableBalance = x.Account.AvaibleBalance,
                                        Status = x.Account.Status
                                    })
                                    .ToListAsync();

            return summary;
        }
    }
}
