using System.Collections.Generic;
using System.Threading.Tasks;
using backend_data_access.Model;

namespace backend_server.Controllers
{
    public interface IPicDbClient
    {
        /// <summary>
        /// Notifies the client which initialized the loading/syncing sequence that it has finished and new data is now available
        /// until this message is received a client may not query for image data
        /// </summary>
        /// <returns>
        /// </returns>
        Task NotifyReady();
        /// <summary>
        /// Notifies the client which initialized the loading sequence that the progress loading is currently <param name="donePercent"></param>>
        /// </summary>
        /// <param name="donePercent">precentage 0.0...1.0 signifying loading progress</param>
        /// <returns></returns>
        Task NotifyLoadPercentage(float donePercent);

        /// <summary>
        /// Message sent back to the client as response to a image query. Images returned this way include all relevant metadata (metadata, tags, photographer)
        /// </summary>
        /// <param name="pictures">Image list sent to the client</param>
        /// <returns></returns>
        Task ImageQueryResponse(IEnumerable<Picture> pictures);

        /// <summary>
        /// Message sent back to the client as response to a short image query. Only Image Names are sent back.
        /// </summary>
        /// <param name="paths">Image list sent to the client</param>
        /// <returns></returns>
        Task ShortImageQueryResponse(IEnumerable<string> paths);
    }
}
