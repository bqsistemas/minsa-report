using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class ReportSummaryRequestValidator : AbstractValidator<ReportSummaryRequest>
    {
        public ReportSummaryRequestValidator()
        {
        }
    }
}
