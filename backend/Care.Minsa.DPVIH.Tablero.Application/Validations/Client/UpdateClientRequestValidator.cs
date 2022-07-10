using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class UpdateClientRequestValidator : AbstractValidator<UpdateClientRequest>
    {
        public UpdateClientRequestValidator()
        {
            RuleFor(x => x.IdentificationNumber).NotEmpty().WithMessage("La identificación es obligatorio.");
        }
    }
}
