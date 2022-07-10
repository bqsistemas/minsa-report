using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class ReportSummaryRequestValidator : AbstractValidator<ReportSummaryRequest>
    {
        public ReportSummaryRequestValidator()
        {
            RuleFor(x => x.Start).LessThanOrEqualTo(x => x.End).WithMessage("La fecha de inicio no puede ser mayor a la fecha fin.");
            RuleFor(x => x.End).GreaterThanOrEqualTo(x => x.Start).WithMessage("La fecha fin no puede ser menor a la fecha de inicio.");
        }
    }
}
