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

        private readonly ImageService _imageService;
        private readonly PictureDatabase _picDb;


        public PictureHub(ImageService imageService, PictureDatabase picDb)
        {
            _imageService = imageService;
            _picDb = picDb;
        }

        /// <summary>
        /// Callable by the Client.
        /// Updates an existing Image with the supplied data
        /// </summary>
        /// <param name="p">Picture to update</param>
        /// <returns></returns>
        public async Task Update(Picture p)
        {
            await _picDb.UpdatePicture(p);
        }

        /// <summary>
        /// Callable by the Client.
        /// Returns all images which match the supplied picture Query
        /// </summary>
        /// <param name="query">query object</param>
        /// <returns>list of all pictures matching the query</returns>
        public async Task GetQuery(PictureQuery query)
        {
            var result = await _picDb.Query(query);

            if (query.Type == FetchType.Full)
            {
                await Clients.Caller.ImageQueryResponse(result);
            }
            else
            {
                await Clients.Caller.ShortImageQueryResponse(result.Select(p => p.Name));
            }
        }

    }
}
