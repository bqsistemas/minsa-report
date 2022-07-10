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
    public class ClientsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public ClientsController(
            IMediator mediator,
            IMapper mapper
            )
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        /// <summary>
        /// Method to get client by identificationNumber
        /// </summary>
        /// <param name="identificationNumber"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{identificationNumber}")]
        public async Task<IActionResult> Get([FromRoute(Name = "identificationNumber")] string identificationNumber)
        {
            var client = await _mediator.Send(new GetClientCommand(identificationNumber));
            return Ok(client);
        }
        /// <summary>
        /// Method to add new client
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(CreateClientRequest request)
        {
            var client = await _mediator.Send(_mapper.Map<CreateClientCommand>(request));
            return Ok(client);
        }
        /// <summary>
        /// Method to update client 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPatch]
        [Route("Update")]
        public async Task<IActionResult> Update(UpdateClientRequest request)
        {
            var client = await _mediator.Send(_mapper.Map<UpdateClientCommand>(request));
            return Ok(client);
        }
        /// <summary>
        /// Method to delete client by identificationNumber
        /// </summary>
        /// <param name="identificationNumber"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("Delete/{identificationNumber}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "identificationNumber")] string identificationNumber)
        {
            var result = await _mediator.Send(new DeleteClientCommand(identificationNumber));
            return Ok(result);
        }
        /// <summary>
        /// Method to activate client by identificationNumber
        /// </summary>
        /// <param name="identificationNumber"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Activate/{identificationNumber}")]
        public async Task<IActionResult> Activate([FromRoute(Name = "identificationNumber")] string identificationNumber)
        {
            var result = await _mediator.Send(new ActivateClientCommand(identificationNumber));
            return Ok(result);
        }
    }
}
