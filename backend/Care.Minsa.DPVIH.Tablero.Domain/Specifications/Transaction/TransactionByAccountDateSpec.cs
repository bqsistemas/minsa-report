using Care.Minsa.DPVIH.Tablero.Core.Enums;
using Care.Minsa.DPVIH.Tablero.Core.Specification;
using Care.Minsa.DPVIH.Tablero.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Domain.Specifications
{
    public class TransactionByAccountDateSpec : BaseSpecification<Transaction>
    {
        public Guid AccountId { get; private set; }
        public Instant Time { get; private set; }
        public TransactionType Type { get; private set; }

        public TransactionByAccountDateSpec(Guid accountId, Instant time, TransactionType type)
        {
            AccountId = accountId;
            Time = time;
            Type = type;
        }

        public override Expression<Func<Transaction, bool>> Criteria()
        {
            DateTimeZone tz = DateTimeZoneProviders.Tzdb.GetSystemDefault();
            ZonedDateTime startDay = tz.AtStartOfDay(Time.InZone(tz).Date);
            ZonedDateTime endDay = tz.AtStartOfDay(Time.InZone(tz).Date.PlusDays(1));

            return x => x.Date >= startDay.ToInstant() && x.Date < endDay.ToInstant() && x.Type == Type;
        }
    }
}
