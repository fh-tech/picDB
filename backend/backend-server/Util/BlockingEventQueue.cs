using System.Collections.Concurrent;
using System.Threading.Tasks;
using backend_server.Model;

namespace backend_server.Util
{
    public class ImageLoadWorkQueue
    {
        private readonly BlockingCollection<IImageLoadTask> _queue = new BlockingCollection<IImageLoadTask>();

        public void Enqueue(IImageLoadTask task) => _queue.Add(task);

        public IImageLoadTask Dequeue() => _queue.Take();


    }
}
