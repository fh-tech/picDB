using System.Collections.Generic;
using System.Linq;
using backend_data_access;
using backend_data_access.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend_server.Controllers
{
    [Route("api/photographer")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly PictureDatabase picDb;

        public PictureController(PictureDatabase db)
        {
            picDb = db;
        }

        [HttpGet()]
        public ActionResult<IEnumerable<Photographer>> GetPhotographer()
        {
            return picDb.GetPhotographers().ToList();
        }



    }
}
