using System.Collections.Generic;
using System.Threading.Tasks;
using backend_data_access.Model;

namespace backend_server.Controllers
{
    public interface IPicDbClient
    {
        Task NotifyReady();
        Task NotifyLoadPercentage(float donePercent);

        Task SendQueryResponse(List<Picture> result);

    }
}
