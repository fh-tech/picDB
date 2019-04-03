using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access;
using backend_data_access.Model;
using backend_server.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace backend_server.Controllers
{
    [Route("api/photographer")]
    [ApiController]
    public class PhotographerController : ControllerBase
    {
        private readonly PictureDatabase _picDb;

        public ILogger<PhotographerController> Logger { private get; set; }


        public PhotographerController(PictureDatabase db)
        {
            _picDb = db;
            Logger = new NullLogger<PhotographerController>();
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhotographer(CreatePhotographer photographer)
        {
            Logger.Log(LogLevel.Information, "POST: on CreatePhotographer");

            var inserted = await _picDb.CreatePhotographer(new Photographer
            {
                FirstName = photographer.FirstName,
                LastName = photographer.LastName
            });

            return Ok(inserted);
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotographers()
        {
            Logger.Log(LogLevel.Information, "GET: All photographers");
            return Ok(await _picDb.GetPhotographers());
        }

        [HttpGet("/{id}")]
        public async Task<IActionResult> GetPhotographer(int id)
        {
            Logger.Log(LogLevel.Information, "GET: Photographer with id %i", new {id});
            return Ok(await _picDb.GetPhotographerById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhotographer(int id)
        {
            Logger.Log(LogLevel.Information, "DELETE: Photographer with id %i", new {id});
            await _picDb.RemovePhotographer(id);
            return Ok();
        }
        //TODO: should update
        [HttpPut]
        public async Task<IActionResult> UpdatePhotographer(int id, UpdatePhotographer photographer)
        {
            Logger.Log(LogLevel.Information, "UPDATE: Photographer with id %i, new data is %s", new {id, photographer});
            await _picDb.UpdatePhotographer(new Photographer{
                Id = id,
                FirstName = photographer.FirstName,
                LastName = photographer.LastName,
            });
            return Ok();
        }
    }
}
