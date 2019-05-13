namespace backend_server.Model
{
    public class ImageLoadTask: IImageLoadTask
    {
        public ImageLoadTask(string directoryPath)
        {
            DirectoryPath = directoryPath;
        }

        public string DirectoryPath {  get; }
    }

    public class ImageSyncTask: IImageLoadTask
    {
        public ImageSyncTask(string directoryPath)
        {
            DirectoryPath = directoryPath;
        }

        public string DirectoryPath { get; }
    }

    public class StopLoadTask: IImageLoadTask
    {
        public string DirectoryPath => "";
    }

    public interface IImageLoadTask
    {
        string DirectoryPath {  get; }
    }
}
