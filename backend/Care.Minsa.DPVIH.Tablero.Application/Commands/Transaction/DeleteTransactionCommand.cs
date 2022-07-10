using Care.Minsa.DPVIH.Tablero.Core.Dtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Commands
{
    public class DeleteTransactionCommand : IRequest<bool>
    {
    }
}
