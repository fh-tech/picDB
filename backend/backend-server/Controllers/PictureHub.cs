using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access;
using backend_data_access.Model;
using backend_server.Services;
using Microsoft.AspNetCore.SignalR;

namespace backend_server.Controllers
{
    public class PictureHub: Hub<IPicDbClient>
    {

        private ImageService _imageService;
        private PictureDatabase _picDb;


        public PictureHub(ImageService imageService, PictureDatabase picDb)
        {
            _imageService = imageService;
            _picDb = picDb;
        }


        public async Task Update(Picture p)
        {
            await _picDb.CreatePicture(p);
        }

        public async Task GetQuery(PictureQuery query)
        {
            var result = await _picDb.Query(query);

            if (query.type == FetchType.Full)
            {
                await Clients.Caller.ImageQueryResponse(result);
            }
            else
            {
                await Clients.Caller.ShortImageQueryResponse(result.Select(p => p.FilePath));
            }
        }

    }
}
