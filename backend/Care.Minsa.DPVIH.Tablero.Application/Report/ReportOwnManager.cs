using Release.Helper.ReportingServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Runtime.InteropServices;
using System.ServiceModel;
using System.Text;

namespace Care.Minsa.DPVIH.Tablero.Application.Report
{
    public class ReportOwnManager : IReportManager
    {
        private class FileType
        {
            public string ContenType
            {
                get;
                set;
            }

            public string Extension
            {
                get;
                set;
            }
        }

        private readonly ReportConfig _config;

        public ReportConfig Config => _config;

        private Encoding Encoding => Encoding.UTF8;

        public int? Timeout
        {
            get;
            set;
        }

        private bool AjaxLoadInitialReport => true;

        private HttpClientCredentialType ClientCredentialType => HttpClientCredentialType.Ntlm;

        private string ReportImagePath => "/Report/ReportImage/?originalPath={0}";

        private bool UseCustomReportImagePath => false;

        public ReportOwnManager(ReportConfig config)
        {
            _config = config;
        }

        public FileResponse GetReportFromServer(string reportName, ReportFormat format)
        {
            throw new NotImplementedException();
        }

        public FileResponse GetReportFromServer(string reportName, ReportFormat format, string rename)
        {
            throw new NotImplementedException();
        }

        public FileResponse GetReportFromServer(string reportName, ReportFormat format, Dictionary<string, string> parameters)
        {
            return GetReportFromServer(reportName, format, parameters, null, isLandscape: false);
        }

        public FileResponse GetReportFromServer(string reportName, ReportFormat format, Dictionary<string, string> parameters, string rename)
        {
            throw new NotImplementedException();
        }
        public FileResponse GetReportFromServer(string reportName, ReportFormat format, [Optional] Dictionary<string, string> parameters, [Optional] string rename, [Optional] bool isLandscape)
        {
            FileResponse fileResponse = new FileResponse();
            byte[] array = null;
            string reportFolder = _config.ReportFolder;
            string urlReportServer = _config.UrlReportServer;
            ICredentials networkCredentials = new NetworkCredential(_config.User, _config.Password, _config.Domain);
            ReportViewerModel reportViewerModel = GetReportViewerModel(urlReportServer, networkCredentials, parameters);
            reportViewerModel.ViewMode = ReportViewModes.Export;
            string text2 = reportViewerModel.ReportPath = reportName;
            array = ReportServiceHelpers.ExportReportToFormat(reportViewerModel, format.ToString(), 0, 0, isLandscape).ReportData;
            FileType contentType = GetContentType(format);
            fileResponse.FileBytes = array;
            fileResponse.FileName = (string.IsNullOrEmpty(rename) ? string.Format("{0}_{1}{2}", Path.GetFileNameWithoutExtension(reportName), DateTime.Now.ToString("ddMMyyyyhhmmss"), contentType.Extension) : $"{Path.GetFileNameWithoutExtension(rename)}{contentType.Extension}");
            fileResponse.ContentType = contentType.ContenType;
            return fileResponse;
        }
        private string _getRequestValue(string key)
        {
            return string.Empty;
        }

        private FileType GetContentType(ReportFormat formato)
        {
            FileType fileType = new FileType();
            switch (formato)
            {
                case ReportFormat.PDF:
                    fileType.ContenType = "application/pdf";
                    fileType.Extension = ".pdf";
                    break;
                case ReportFormat.EXCELOPENXML:
                    fileType.ContenType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fileType.Extension = ".xlsx";
                    break;
                case ReportFormat.MHTML:
                    fileType.ContenType = "multipart/related";
                    fileType.Extension = ".mhtml";
                    break;
                case ReportFormat.EXCEL:
                    fileType.ContenType = "application/vnd.ms-excel";
                    fileType.Extension = ".xls";
                    break;
                case ReportFormat.WORDOPENXML:
                    fileType.ContenType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fileType.Extension = ".docx";
                    break;
                case ReportFormat.WORD:
                    fileType.ContenType = "application/msword";
                    fileType.Extension = ".doc";
                    break;
            }

            return fileType;
        }

        private ReportViewerModel GetReportViewerModel(string urlReportServer, ICredentials networkCredentials, Dictionary<string, string> parameters)
        {
            ReportViewerModel reportViewerModel = new ReportViewerModel();
            reportViewerModel.AjaxLoadInitialReport = AjaxLoadInitialReport;
            reportViewerModel.ClientCredentialType = ClientCredentialType;
            reportViewerModel.Credentials = networkCredentials;
            string value = _getRequestValue("ReportViewerEnablePaging");
            if (value.HasValue())
            {
                reportViewerModel.EnablePaging = value.ToBoolean();
            }
            else
            {
                reportViewerModel.EnablePaging = true;
            }

            reportViewerModel.Encoding = Encoding;
            reportViewerModel.ServerUrl = urlReportServer;
            reportViewerModel.ReportImagePath = ReportImagePath;
            reportViewerModel.Timeout = Timeout;
            reportViewerModel.UseCustomReportImagePath = UseCustomReportImagePath;
            reportViewerModel.BuildParameters(parameters);
            return reportViewerModel;
        }
    }
}
