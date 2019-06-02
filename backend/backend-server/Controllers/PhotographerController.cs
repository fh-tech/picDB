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

            // automatically returns 400 when validation or binding fails but for logging we do it explicitly
            if (!ModelState.IsValid)
            {
                Logger.Log(LogLevel.Information, "CREATE: Photographer with %s, failed!", new {photographer});
                return BadRequest();
            }

            var inserted = await _picDb.CreatePhotographer(new Photographer
            {
                FirstName = photographer.FirstName,
                LastName = photographer.LastName,
                Birthday = photographer.Birthday.Date,
                Notes = photographer.Notes
            });
            return Ok(inserted);
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotographers()
        {
            Logger.Log(LogLevel.Information, "GET: All photographers");
            return Ok(await _picDb.GetPhotographers());
        }

        [HttpGet("{id}")]
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


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhotographer(int id, UpdatePhotographer photographer)
        {
            Logger.Log(LogLevel.Information, "UPDATE: Photographer with id %i, new data is %s", new {id, photographer});

            if (!ModelState.IsValid)
            {
                Logger.Log(LogLevel.Information, "UPDATE: Photographer with id %i, new data %s, failed!",
                    new {id, photographer});
                return BadRequest();
            }

            await _picDb.UpdatePhotographer(new Photographer{
                Id = id,
                FirstName = photographer.FirstName,
                LastName = photographer.LastName,
                Birthday = photographer.Birthday.Date,
                Notes = photographer.Notes
            });
            return Ok();
        }
    }
}
