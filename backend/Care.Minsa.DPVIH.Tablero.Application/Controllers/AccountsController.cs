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
    public class AccountsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public AccountsController(
            IMediator mediator,
            IMapper mapper
            )
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        /// <summary>
        /// Method to get account by accountNumber
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{accountNumber}")]
        public async Task<IActionResult> Get([FromRoute(Name = "accountNumber")] string accountNumber)
        {
            var account = await _mediator.Send(new GetAccountCommand(accountNumber));
            return Ok(account);
        }
        /// <summary>
        /// Method to add new account
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(CreateAccountRequest request)
        {
            var account = await _mediator.Send(_mapper.Map<CreateAccountCommand>(request));
            return Ok(account);
        }
        /// <summary>
        /// Method to update account
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPatch]
        [Route("Update")]
        public async Task<IActionResult> Update(UpdateAccountRequest request)
        {
            var client = await _mediator.Send(_mapper.Map<UpdateAccountCommand>(request));
            return Ok(client);
        }
        /// <summary>
        /// Method to delete account by accountNumber
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("Delete/{accountNumber}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "accountNumber")] string accountNumber)
        {
            var result = await _mediator.Send(new DeleteAccountCommand(accountNumber));
            return Ok(result);
        }
        /// <summary>
        /// Method to activate account by accountNumber
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Activate/{accountNumber}")]
        public async Task<IActionResult> Activate([FromRoute(Name = "accountNumber")] string identificationNumber)
        {
            var result = await _mediator.Send(new ActivateAccountCommand(identificationNumber));
            return Ok(result);
        }
    }
}
