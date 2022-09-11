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
using System.IO;
using Care.Minsa.DPVIH.Tablero.Application.Converter;

namespace Care.Minsa.DPVIH.Tablero.Application.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ReportsController : ControllerBase
    {
        private readonly IReportManager _reportManager;
        private readonly IConfiguration _configuration;
        public ReportsController(
            IReportManager reportManager,
            IConfiguration configuration
            )
        {
            _reportManager = reportManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("ReportPdf")]
        public async Task<IActionResult> ReportPdf(ReportSummaryRequest request)
        {
            var excep = new Exception();
            var sr = new Release.Helper.StatusResponse();
            ReportFormat format = ReportFormat.MHTML;
            string rdl = "";//filter.Rdl;

            switch (request.ReportType)
            {
                case Core.Enums.MinsaReportType.VIH:
                    rdl = _configuration.GetValue<string>("ReportConfig:ReportVIH");
                    break;
                case Core.Enums.MinsaReportType.ITS:
                    rdl = _configuration.GetValue<string>("ReportConfig:ReportITS");
                    break;
                case Core.Enums.MinsaReportType.TMI:
                    rdl = _configuration.GetValue<string>("ReportConfig:ReportTMI");
                    break;
                case Core.Enums.MinsaReportType.HEPATITIS:
                    rdl = _configuration.GetValue<string>("ReportConfig:ReportHEPATITIS");
                    break;
                default:
                    rdl = "";
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
                parameters.Add("RED", request.Red == "" ? "-1" : request.Red);
                parameters.Add("MRED", request.MicroRed == "" ? "-1" : request.MicroRed);
                parameters.Add("ESTAB", request.Establecimiento == "" ? "-1" : request.Establecimiento);
                parameters.Add("DPTO", request.Departamento == "" ? "-1" : request.Departamento);
                parameters.Add("PROV", request.Provincia == "" ? "-1" : request.Provincia);
                parameters.Add("DIST", request.Distrito == "" ? "-1" : request.Distrito);
                parameters.Add("ETAPA", request.GrupoEtario.ToString());
                parameters.Add("SEXO", request.Sexo == "" ? "-1" : request.Sexo);
                parameters.Add("ETNIA", request.Etnia == "" ? "-1" : request.Etnia);
                parameters.Add("POBLACION", request.TipoPoblacion == "" ? "-1" : request.TipoPoblacion);

                rm = _reportManager.GetReportFromServer(rdl, format, parameters);

                string htmlText = System.Text.Encoding.Default.GetString(rm.FileBytes);
                MHTMLParser parser = new MHTMLParser(htmlText);
                string html = parser.getHTMLText();

                return Ok(new
                {
                    template = html
                });
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
