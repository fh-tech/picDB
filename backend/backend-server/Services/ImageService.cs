using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access;
using backend_data_access.Model;
using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Directory = System.IO.Directory;

namespace backend_server.Services
{
    public class ImageService
    {
        private static readonly string[] SupportedExtensions = {"jpeg", "jpg"};

        private readonly PictureDatabase _picDb;
        public ILogger<ImageService> Logger { private get; set; }


        public ImageService(PictureDatabase picDb)
        {
            _picDb = picDb;
            Logger = new NullLogger<ImageService>();
        }

        public async Task UpdatePictureDataFromDirectory(string dir)
        {
            Logger.Log(LogLevel.Information, "Requested rebuilding of Image Database with directory [%s]", new {dir});
            var images = LoadImages(dir).ToList();
            Logger.Log(LogLevel.Information, "Found %s valid image entries in directory [%s]", new {images.Count, dir});
            await _picDb.RebuildPictureTable(images);
        }

        private static IEnumerable<Picture> LoadImages(string folderPath)
        {
            var files = Directory.GetFiles(folderPath).Where(f =>
                SupportedExtensions.Any(ext =>
                    Path.GetExtension(f).ToLower() == ext));
            return  files.Select(LoadFromFile);
        }

        private static Picture LoadFromFile(string file)
        {
            var metaData = LoadMetaData(file);

            return new Picture
            {
                FilePath = file,
                MetaData = metaData,
                Photographer = null
            };
        }

        private static MetaData LoadMetaData(string file)
        {
            //TODO: implement metadata reading
            return new MetaData
            {
                Data =
                {
                    new MetaDataEntry
                    {
                        Key = "Aperture",
                        Value = "2.0f",
                        Type = MetaDataType.Exif
                    }
                }
            };
        }
    }
}
