using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class CreateAccountRequestValidator : AbstractValidator<CreateAccountRequest>
    {
        public CreateAccountRequestValidator()
        {
            RuleFor(x => x.InitialBalance).GreaterThan(0).WithMessage("El saldo inicial no puede ser menor o igual a 0.");
        }
    }
}
