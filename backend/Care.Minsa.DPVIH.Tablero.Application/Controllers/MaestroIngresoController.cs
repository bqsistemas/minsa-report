using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using Care.Minsa.DPVIH.Tablero.Application.Requests.MaestroIngreso;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Care.Minsa.DPVIH.Tablero.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class MaestroIngresoController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public MaestroIngresoController(
            IMediator mediator,
            IMapper mapper
            )
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromRoute(Name = "id")] int id)
        {
            var result = await _mediator.Send(new ObtenerIndicadorCommand(id));
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> Add(CreateMaestroIngresoRequest request)
        {
            var result = await _mediator.Send(_mapper.Map<RegistroIndicadorCommand>(request));
            return Ok(result);
        }
        [HttpPut]
        public async Task<IActionResult> Update(UpdateMaestroIngresoRequest request)
        {
            var result = await _mediator.Send(_mapper.Map<EditarIndicadorCommand>(request));
            return Ok(result);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int id)
        {
            var result = await _mediator.Send(new EliminarIndicadorCommand(id));
            return Ok(result);
        }
        [HttpPost]
        [Route("Paged")]
        public async Task<IActionResult> Paged(MaestroIngresoPagedRequest filter)
        {
            var result = await _mediator.Send(new ListarPaginadoIndicadorCommand(filter));
            return Ok(result);
        }
    }
}
