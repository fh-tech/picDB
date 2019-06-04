using System.IO;
using System.Threading.Tasks;
using backend_data_access;
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

        private readonly PictureDatabase _picDb;
        private readonly ImageLoadWorkQueue _workQueue;

        public ILogger<ImageLoadBackgroundService> Logger { private get; set; }


        public PictureController(ImageLoadWorkQueue workQueue, PictureDatabase db)
        {
            _picDb = db;
            _workQueue = workQueue;
            Logger = new NullLogger<ImageLoadBackgroundService>();
        }
        /// <summary>
        /// Commands the server to load a new folder. This API call returns immediately and actual loading is done as background task.
        /// </summary>
        /// <param name="folderPath">new folder to load</param>
        /// <returns>200 on success or 400 if the given directory does not exist</returns>
        [HttpPost]
        public IActionResult LoadPictureFolder(FolderPath folderPath)
        {
            Logger.Log(LogLevel.Information, "POST: [%s] on LoadPictureFolder", new {folderPath.Path});
            if (!Directory.Exists(folderPath.Path))
            {
                Logger.Log(LogLevel.Error, "Path [%s] is not a valid directory path on this server", new {folderPath.Path});
                return BadRequest();
            }

            Logger.Log(LogLevel.Trace, "Added new ImageLoadTask to WorkQueue");

            _workQueue.Enqueue(new ImageLoadTask(folderPath.Path));

            return Ok();
        }

        /// <summary>
        /// Commands the server to sync an existing folder. This API call returns immediately and actual loading is done as background task.
        /// </summary>
        /// <param name="folderPath">folder to sync</param>
        /// <returns>200 on success or 400 if the given directory does not exist</returns>
        [HttpPut]
        public IActionResult SyncPictureFolder(FolderPath folderPath)
        {
            Logger.Log(LogLevel.Information, "PUT: [%s] on SyncPictureFolder", new {folderPath});
            if (!Directory.Exists(folderPath.Path))
            {
                Logger.Log(LogLevel.Error, "Path [%s] is not a valid path on this server", new {folderPath});
                return BadRequest();
            }

            Logger.Log(LogLevel.Trace, "Added new ImageSyncTask to WorkQueue");
            _workQueue.Enqueue(new ImageSyncTask(folderPath.Path));
            return Ok();
        }

        /// <summary>
        /// Returns a Picture given a filename
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPicture(string fileName)
        {
            Logger.Log(LogLevel.Information, "GET: Picture with name %s", new {fileName});
            return Ok(await _picDb.GetPictureByName(fileName));
        }

        /// <summary>
        /// Returns a Picture given an Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPictureIndex(int id)
        {
            Logger.Log(LogLevel.Information, "GET: Index of picture with id %i", new {id});
            return Ok(await _picDb.GetPictureIndexById(id));
        }



    }
}
