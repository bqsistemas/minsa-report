using AutoMapper;
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
    public class ReportsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public ReportsController(
            IMediator mediator,
            IMapper mapper
            )
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        /// <summary>
        /// Method to get summary of client
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Add([FromQuery] ReportSummaryRequest request)
        {
            // var client = await _mediator.Send(_mapper.Map<ReportSummaryCommand>(request));
            return Ok(null);
        }
    }
}
