using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public TransactionsController(
            IMediator mediator,
            IMapper mapper
            )
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        /// <summary>
        /// Method to add new transaction
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(CreateTransactionRequest request)
        {
            var transaction = await _mediator.Send(_mapper.Map<CreateTransactionCommand>(request));
            return Ok(transaction);
        }
        /* [HttpPatch]
        [Route("Update")]
        public async Task<IActionResult> Update(UpdateTransactionRequest request)
        {
            var transaction = await _mediator.Send(_mapper.Map<UpdateTransactionCommand>(request));
            return Ok(transaction);
        }
        [HttpDelete]
        [Route("Delete/{transactionId}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "transactionId")] Guid transactionId)
        {
            return Ok();
        } */
    }
}
