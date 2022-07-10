using Care.Minsa.DPVIH.Tablero.Application.Requests;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Validations
{
    public class CreateClientRequestValidator : AbstractValidator<CreateClientRequest>
    {
        public CreateClientRequestValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("El Nombre es obligatorio.");
            RuleFor(x => x.Gender).NotEmpty().WithMessage("El Género es obligatorio.");
            RuleFor(x => x.Age).NotEmpty().WithMessage("La Edad es obligatorio.");
            RuleFor(x => x.IdentificationNumber).NotEmpty().WithMessage("La identificación es obligatorio.");
            RuleFor(x => x.Address).NotEmpty().WithMessage("La Dirección es obligatorio.");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("El Teléfono es obligatorio.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("La Contraseña es obligatorio.");
        }
    }
}
