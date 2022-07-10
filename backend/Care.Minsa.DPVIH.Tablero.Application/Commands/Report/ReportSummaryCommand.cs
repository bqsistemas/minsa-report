using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using MediatR;
using NodaTime;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class ReportSummaryCommand : IRequest<List<TransactionSummaryDto>>
    {
        public string ClientIdentification { get; set; }
        public Instant Start { get; set; }
        public Instant End { get; set; }
    }
}
