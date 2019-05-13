using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using backend_data_access;
using backend_data_access.Model;
using backend_server.Util;
using MetadataExtractor;
using MetadataExtractor.Formats.Exif;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Directory = System.IO.Directory;

namespace backend_server.Services
{
    public class ImageService
    {
        private static readonly string[] SupportedExtensions = {".jpeg", ".jpg", ".png"};

        private readonly PictureDatabase _picDb;
        public ILogger<ImageService> Logger { private get; set; }


        public ImageService(PictureDatabase picDb)
        {
            _picDb = picDb;
            Logger = new NullLogger<ImageService>();
        }

        public async Task UpdatePictureDataFromDirectory(string dir, Func<float, Task> notifyProgress = null)
        {
            Logger.Log(LogLevel.Information, "Requested rebuilding of Image Database with directory [%s]", new {dir});
            var images = (await LoadImages(dir, notifyProgress)).ToList();
            Logger.Log(LogLevel.Information, "Found %s valid image entries in directory [%s]", new {images.Count, dir});
            await _picDb.RebuildPictureTable(images);
        }


        public async Task SyncPictureDataFromDirectory(string dir, Action<float> notifyProgress = null)
        {
            Logger.Log(LogLevel.Information, "Requested file sync with files from directory [%s]", new {dir});

            var paths = LoadPaths(dir);

            var newPaths = await _picDb.FilterNewPaths(paths);

            await _picDb.InsertAll(newPaths.Select(LoadFromFile));
        }

        private static List<string> LoadPaths(string directory) =>
            Directory.GetFiles(directory)
                .Where(f =>
                    SupportedExtensions
                        .Any(ext => Path.GetExtension(f).ToLower() == ext))
                .ToList();


        private static async Task<IEnumerable<Picture>> LoadImages(string folderPath, Func<float, Task> notifyProgress){
            var files = LoadPaths(folderPath);

            await notifyProgress(0.05f);

            var i = 0;
            var size = files.Count;

            return files
                .Select(LoadFromFile)
                .Partition(100)
                .Tap(async _ => { await notifyProgress(100f * i++ / size * 0.8f + 0.05f); })
                .SelectMany(fs => fs);
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
            Thread.Sleep(50);
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
