using System.Threading.Tasks;

namespace backend_server.Controllers
{
    public interface IPicDbClient
    {
        Task NotifyReady();
        Task NotifyLoadPercentage(float donePercent);

    }
}
