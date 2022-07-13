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
            var client = await _mediator.Send(new ObtenerIndicadorCommand(id));
            return Ok(client);
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add(CreateMaestroIngresoRequest request)
        {
            var entity = await _mediator.Send(_mapper.Map<RegistroIndicadorCommand>(request));
            return Ok(entity);
        }
        [HttpPatch]
        [Route("Update")]
        public async Task<IActionResult> Update(UpdateMaestroIngresoRequest request)
        {
            var client = await _mediator.Send(_mapper.Map<EditarIndicadorCommand>(request));
            return Ok(client);
        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute(Name = "id")] int id)
        {
            var result = await _mediator.Send(new EliminarIndicadorCommand(id));
            return Ok(result);
        }
    }
}
