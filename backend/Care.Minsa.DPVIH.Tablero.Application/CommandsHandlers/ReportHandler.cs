using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using Care.Minsa.DPVIH.Tablero.Infraestructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.CommandsHandlers
{
    internal class ReportHandler :
        IRequestHandler<ReportSummaryCommand, List<TransactionSummaryDto>>
    {
        private readonly IUnitOfWork _context;
        public ReportHandler(
            IUnitOfWork context
            )
        {
            _context = context;
        }
        public async Task<List<TransactionSummaryDto>> Handle(ReportSummaryCommand request, CancellationToken cancellationToken)
        {
            return await _context.TransactionRepository.GetSummaryByClient(request.ClientIdentification, request.Start, request.End);
        }
    }
}
