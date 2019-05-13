using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using backend_server.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace backend_server.Controllers
{
    [Route("report")]
    [Controller]
    public class ReportController: Controller
    {

        [Route("summary")]
        [HttpGet]
        public async Task SummaryReport()
        {
            var view = await RenderViewAsync(this, "Report", new SummaryReportViewModel());

            var renderer = new IronPdf.HtmlToPdf();

            var pdf = renderer.RenderHtmlAsPdf(view);

            Response.Clear();
            Response.ContentType = "application/pdf";
            Response.Headers["Content-Disposition"] = "attachment;filename=\"summary-report.pdf\"";

            await Response.Body.WriteAsync(pdf.BinaryData);
        }


        private static async Task<string> RenderViewAsync<TModel>(Controller controller, string viewName, TModel model, bool partial = false)
        {
            if (string.IsNullOrEmpty(viewName))
            {
                viewName = controller.ControllerContext.ActionDescriptor.ActionName;
            }

            controller.ViewData.Model = model;

            using var writer = new StringWriter();
            IViewEngine viewEngine = controller.HttpContext.RequestServices.GetService(typeof(ICompositeViewEngine)) as ICompositeViewEngine;
            var viewResult = viewEngine?.FindView(controller.ControllerContext, viewName, !partial);

            if (viewResult?.Success == false)
            {
                return $"A view with the name {viewName} could not be found";
            }

            var viewContext = new ViewContext(
                controller.ControllerContext,
                viewResult?.View,
                controller.ViewData,
                controller.TempData,
                writer,
                new HtmlHelperOptions()
            );
            if (viewResult != null) await viewResult.View.RenderAsync(viewContext);
            return writer.GetStringBuilder().ToString();

        }

    }

}
