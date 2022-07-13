using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Commands;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
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
    public class CommonController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CommonController(
            IMediator mediator
            )
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        [Route("departamentos")]
        public async Task<IActionResult> GetDepartamentos()
        { 
            var departamentos = await _mediator.Send(new ListarDepartamentoCommand());
            return Ok(departamentos);
        }
        [HttpGet]
        [Route("provincias/{departamento}")]
        public async Task<IActionResult> GetProvincias([FromRoute(Name = "departamento")] string departamento)
        {
            var provincias = await _mediator.Send(new ListarProvinciaCommand(departamento));
            return Ok(provincias);
        }
        [HttpGet]
        [Route("distritos/{departamento}/{provincia}")]
        public async Task<IActionResult> GetDistritos([FromRoute(Name = "departamento")] string departamento, [FromRoute(Name = "provincia")] string provincia)
        {
            var distritos = await _mediator.Send(new ListarDistritoCommand(departamento, provincia));
            return Ok(distritos);
        }
        [HttpGet]
        [Route("meses")]
        public async Task<IActionResult> GetMeses()
        {
            var meses = await _mediator.Send(new ListarMesesCommand());
            return Ok(meses);
        }
        [HttpGet]
        [Route("disas")]
        public async Task<IActionResult> GetDisas()
        {
            var disas = await _mediator.Send(new ListarDisaCommand());
            return Ok(disas);
        }
        [HttpGet]
        [Route("redes/{disa}")]
        public async Task<IActionResult> GetRedes([FromRoute(Name = "disa")] string disa)
        {
            var disas = await _mediator.Send(new ListarRedCommand(disa));
            return Ok(disas);
        }
        [HttpGet]
        [Route("microredes/{disa}/{red}")]
        public async Task<IActionResult> GetMicroRedes([FromRoute(Name = "disa")] string disa, [FromRoute(Name = "red")] string red)
        {
            var redes = await _mediator.Send(new ListarMicroRedCommand(disa, red));
            return Ok(redes);
        }
        [HttpGet]
        [Route("establecimientos/{disa}/{red}/{microred}")]
        public async Task<IActionResult> GetMicroRedes([FromRoute(Name = "disa")] string disa, [FromRoute(Name = "red")] string red, [FromRoute(Name = "microred")] string microred)
        {
            var establecimientos = await _mediator.Send(new ListarEstablecimientoCommand(disa, red, microred));
            return Ok(establecimientos);
        }
        [HttpGet]
        [Route("etnias")]
        public async Task<IActionResult> GetEtnias()
        {
            var meses = await _mediator.Send(new ListarEtniaCommand());
            return Ok(meses);
        }
        [HttpGet]
        [Route("grupoEtarios")]
        public async Task<IActionResult> GetGrupoEtarios()
        {
            var meses = await _mediator.Send(new ListarGrupoEtarioCommand());
            return Ok(meses);
        }
    }
}
