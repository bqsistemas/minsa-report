using AutoMapper;
using Care.Minsa.DPVIH.Tablero.Application.Requests;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Reporting.NETCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Release.Helper;
using Release.Helper.ReportingServices;
using HtmlAgilityPack;

namespace Care.Minsa.DPVIH.Tablero.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportManager _reportManager;
        public ReportsController(
            IReportManager reportManager
            )
        {
            _reportManager = reportManager;
        }
        [HttpPost]
        [Route("ReportPdf")]
        public async Task<IActionResult> ReportPdf()
        {
            var excep = new Exception();
            var sr = new Release.Helper.StatusResponse();
            ReportFormat format = ReportFormat.PDF;
            string rdl = "rptTipoReporte";//filter.Rdl;
            string nombreReporte = "rptTipoReporte";//filter.Procedimiento.Replace(" ", "").Replace(".", "");
            var rm = new Release.Helper.ReportingServices.FileResponse();
            try
            {
                Dictionary<string, string> parameters = new Dictionary<string, string>();
                parameters.Add("ID_TIPO_REPORTE", "1");

                rm = _reportManager.GetReportFromServer(rdl, format, parameters);

                return File(rm.FileBytes, rm.ContentType, nombreReporte);
                //sr = new Release.Helper.StatusResponse(true, "Reporte generado", File(rm.FileBytes, rm.ContentType, nombreReporte));
            }
            catch (Exception ex)
            {
                excep = ex;
                sr = new Release.Helper.StatusResponse(false, "Ocurrio un problema al generar el Reporte.", excep);
            }

            return Ok(sr);
        }
    }
}
