using System.Threading;
using System.Threading.Tasks;
using backend_server.Controllers;
using backend_server.Model;
using backend_server.Util;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace backend_server.Services
{
    /// <summary>
    /// Background service which loads and syncs the database with supplied folders.
    /// Sync and Load tasks are supplied via the ImageLoadWorkQueue which can be injected where needed
    /// </summary>
    public class ImageLoadBackgroundService : BackgroundService
    {
        private readonly IHubContext<PictureHub, IPicDbClient> _hubContext;
        private readonly IServiceScopeFactory _scopeProvider;

        private readonly ImageLoadWorkQueue _workQueue;

        public ImageLoadBackgroundService(
            ImageLoadWorkQueue queue,
            IServiceScopeFactory scopeProvider,
            IHubContext<PictureHub, IPicDbClient> picHubContext)
        {
            _workQueue = queue;
            _scopeProvider = scopeProvider;
            _hubContext = picHubContext;
            Logger = new NullLogger<ImageLoadBackgroundService>();
        }

        public ILogger<ImageLoadBackgroundService> Logger { private get; set; }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            return LoadImages();
        }

        private async Task LoadImages()
        {
            while (true)
            {
                var workItem = _workQueue.Dequeue();
                switch (workItem)
                {
                    //stops the background service completly
                    case StopLoadTask _:
                        return;
                    //load a new folder
                    case ImageLoadTask _:
                    {
                        using (var scope = _scopeProvider.CreateScope())
                        {
                            var imageService = scope.ServiceProvider.GetService<ImageService>();
                            await imageService.UpdatePictureDataFromDirectory(workItem.Path,
                                _hubContext.Clients.All.NotifyLoadPercentage);
                            await _hubContext.Clients.All.NotifyReady();
                        }

                        break;
                    }
                    //sync existing folder
                    case ImageSyncTask _:
                    {
                        using (var scope = _scopeProvider.CreateScope())
                        {
                            var imageService = scope.ServiceProvider.GetService<ImageService>();
                            await imageService.SyncPictureDataFromDirectory(workItem.Path,
                                _hubContext.Clients.All.NotifyLoadPercentage);
                            await _hubContext.Clients.All.NotifyReady();
                        }

                        break;
                    }
                }
            }
        }
    }
}
