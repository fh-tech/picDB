using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access;
using backend_data_access.Model;
using backend_server.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers
{
    [Route("api/photographer")]
    [ApiController]
    public class PhotographerController : ControllerBase
    {
        private readonly PictureDatabase picDb;

        public PhotographerController(PictureDatabase db)
        {
            picDb = db;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhotographer(CreatePhotographer photographer)
        {
            await picDb.CreatePhotographer(photographer);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotographers()
        {
            return Ok(await picDb.GetPhotographers());
        }

        [HttpGet("/{id}")]
        public async Task<IActionResult> GetPhotographer(int id)
        {
            return Ok(await picDb.GetPhotographerById(id));
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePhotographer(int id)
        {
            await picDb.RemovePhotographer(id);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> UpdatePhotographer(int id, UpdatePhotographer photographer)
        {
            await picDb.UpdatePhotographer(new Photographer{
                Id = id,
                FirstName = photographer.FirstName,
                LastName = photographer.LastName,
            });
            return Ok();
        }
    }
}
