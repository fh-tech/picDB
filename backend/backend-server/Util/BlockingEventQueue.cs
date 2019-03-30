using System.Collections.Concurrent;
using System.Threading.Tasks;
using backend_server.Model;

namespace backend_server.Util
{
    public class ImageLoadWorkQueue
    {
        private readonly BlockingCollection<ImageLoadTask> _queue = new BlockingCollection<ImageLoadTask>();

        public void Enqueue(ImageLoadTask task) => _queue.Add(task);

        public IImageLoadTask Dequeue() => _queue.Take();


    }
}
