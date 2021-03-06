using System.Threading.Tasks;
using backend_data_access;
using backend_server.Model;
using jsreport.AspNetCore;
using jsreport.Types;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers
{
    [Route("report")]
    [Controller]
    public class ReportController : Controller
    {
        private readonly PictureDatabase _database;

        public ReportController(PictureDatabase database)
        {
            _database = database;
        }

        /// <summary>
        /// Generates a pdf report for a single image
        /// </summary>
        /// <param name="id">image to report</param>
        /// <returns>pdf report file</returns>
        [Route("image/{id}")]
        [HttpGet]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public async Task<IActionResult> ImageReport(int id)
        {
            HttpContext
                .JsReportFeature()
                .Recipe(Recipe.ChromePdf)
                .OnAfterRender(r =>
                    HttpContext.Response.Headers["Content-Disposition"] = "attachment; filename=\"report.pdf\"");
            var image = await _database.GetPictureById(id);
            var viewModel = new ImageReportViewModel(image);

            return View(viewModel);
        }

        /// <summary>
        /// Generates a pdf report for all image tags
        /// </summary>
        /// <returns>pdf report file</returns>
        [Route("tags")]
        [HttpGet]
        [MiddlewareFilter(typeof(JsReportPipeline))]
        public async Task<IActionResult> TagsReport()
        {
            HttpContext
                .JsReportFeature()
                .Recipe(Recipe.ChromePdf)
                .OnAfterRender(r =>
                    HttpContext.Response.Headers["Content-Disposition"] = "attachment; filename=\"report.pdf\"");
            var model = await _database.TagReport();
            var viewModel = new TagReportViewModel {tagCount = model};
            return View(viewModel);
        }
    }
}
