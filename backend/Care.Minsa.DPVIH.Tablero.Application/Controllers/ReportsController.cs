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
        public async Task<IActionResult> ReportPdf(ReportSummaryRequest request)
        {
            var excep = new Exception();
            var sr = new Release.Helper.StatusResponse();
            ReportFormat format = ReportFormat.PDF;
            string rdl = "";//filter.Rdl;

            switch (request.ReportType)
            {
                case Core.Enums.MinsaReportType.VIH:
                    rdl = "RPT_VIH";
                    break;
                case Core.Enums.MinsaReportType.ITS:
                    rdl = "RPT_ITS";
                    break;
                case Core.Enums.MinsaReportType.TMI:
                    rdl = "RPT_TMI";
                    break;
                case Core.Enums.MinsaReportType.HEPATITIS:
                    rdl = "RPT_HEPATITIS";
                    break;
                default:
                    rdl = "rptTipoReporte";
                    break;
            }

            var rm = new Release.Helper.ReportingServices.FileResponse();
            try
            {
                Dictionary<string, string> parameters = new Dictionary<string, string>();
                parameters.Add("ID_TIPO_REPORTE", "1");
                parameters.Add("ANIO", request.Anio);
                parameters.Add("MES", request.Mes);
                parameters.Add("DISA", request.Disa);
                parameters.Add("RED", request.Red);
                parameters.Add("MRED", request.MicroRed);
                parameters.Add("ESTAB", request.Establecimiento);
                parameters.Add("DPTO", request.Departamento);
                parameters.Add("PROV", request.Provincia);
                parameters.Add("DIST", request.Distrito);
                parameters.Add("ETAPA", request.GrupoEtario);
                parameters.Add("SEXO", request.Sexo);
                parameters.Add("ETNIA", request.Etnia);

                rm = _reportManager.GetReportFromServer(rdl, format, parameters);

                return File(rm.FileBytes, rm.ContentType, "Reporte");
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
