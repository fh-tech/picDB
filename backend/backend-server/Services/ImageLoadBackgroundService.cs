using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using backend_data_access.Model;
using backend_server.Controllers;
using backend_server.Model;
using backend_server.Util;
using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Directory = System.IO.Directory;

namespace backend_server.Services
{
    public class ImageLoadBackgroundService : BackgroundService
    {
        public ILogger<ImageLoadBackgroundService> Logger { private get; set; }

        private ImageLoadWorkQueue _workQueue;
        private IServiceScopeFactory _scopeProvider;
        private IHubContext<PictureHub, IPicDbClient> _hubContext;

        public ImageLoadBackgroundService(
            ImageLoadWorkQueue queue,
            ILogger<ImageLoadBackgroundService> logger,
            IServiceScopeFactory scopeProvider,
            IHubContext<PictureHub, IPicDbClient> picHubContext)
        {
            _workQueue = queue;
            _scopeProvider = scopeProvider;
            _hubContext = picHubContext;
            Logger = new NullLogger<ImageLoadBackgroundService>();
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken) => LoadImages();

        private async Task LoadImages()
        {
            while (true)
            {
                var workItem = _workQueue.Dequeue();
                if (workItem is StopLoadTask)
                {
                    break;
                }

                using (var scope = _scopeProvider.CreateScope())
                {
                    var imageService = scope.ServiceProvider.GetService<ImageService>();
                    await imageService.UpdatePictureDataFromDirectory(workItem.DirectoryPath);
                    _hubContext.Clients.All.NotifyReady();
                }
            }
        }
    }
}
