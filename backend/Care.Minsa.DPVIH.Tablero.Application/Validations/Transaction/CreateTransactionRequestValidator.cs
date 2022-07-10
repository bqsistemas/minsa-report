using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class CreateTransactionRequestValidator : AbstractValidator<CreateTransactionRequest>
    {
        public CreateTransactionRequestValidator()
        {
            RuleFor(x => x.Amount).GreaterThan(0).WithMessage("El valor no puede ser menor o igual a 0.");
        }
    }
}
