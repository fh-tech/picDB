namespace backend_server.Model
{
    public class ImageLoadTask : IImageLoadTask
    {
        public ImageLoadTask(string directoryPath)
        {
            Path = directoryPath;
        }

        public string Path { get; }
    }

    public class ImageSyncTask : IImageLoadTask
    {
        public ImageSyncTask(string directoryPath)
        {
            Path = directoryPath;
        }

        public string Path { get; }
    }

    public class StopLoadTask : IImageLoadTask
    {
        public string Path => "";
    }

    public interface IImageLoadTask
    {
        string Path { get; }
    }
}
