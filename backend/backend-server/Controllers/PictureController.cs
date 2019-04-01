using System.IO;
using System.Threading.Tasks;
using backend_server.Model;
using backend_server.Services;
using backend_server.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace backend_server.Controllers
{

    [Route("api/pictures")]
    [ApiController]
    public class PictureController: ControllerBase
    {

        private ImageLoadWorkQueue _workQueue;
        public ILogger<ImageLoadBackgroundService> Logger { private get; set; }


        public PictureController(ImageLoadWorkQueue workQueue)
        {
            _workQueue = workQueue;
            Logger = new NullLogger<ImageLoadBackgroundService>();
        }

        [HttpPost]
        public IActionResult LoadPictureFolder(string folderPath)
        {
            Logger.Log(LogLevel.Information, "POST: [%s] on LoadPictureFolder", new {folderPath});
            if (!Directory.Exists(folderPath))
            {
                Logger.Log(LogLevel.Error, "Path [%s] is not a valid directory path on this server", new {folderPath});
                return BadRequest();
            }
            Logger.Log(LogLevel.Trace, "Added new ImageLoadTask to WorkQueue");

            _workQueue.Enqueue(new ImageLoadTask(folderPath));

            return Ok();
        }

    }
}
