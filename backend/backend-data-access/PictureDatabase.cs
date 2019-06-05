using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace backend_data_access
{
    public class PictureDatabase
    {
        private readonly PicDbContext _ctx;


        public PictureDatabase(PicDbContext ctx)
        {
            _ctx = ctx;
            Logger = new NullLogger<PictureDatabase>();
        }

        public ILogger<PictureDatabase> Logger { private get; set; }

        /// <summary>
        /// Loads an Image from the database includes all associated data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Picture> GetPictureById(int id)
        {
            return await _ctx.Pictures
                .Where(p => p.PictureId.Equals(id))
                .Include(p => p.Photographer)
                .Include(p => p.TagList)
                .Include(p => p.MetaData)
                .ThenInclude(m => m.Data)
                .Take(1)
                .SingleAsync();
        }
        /// <summary>
        /// Loads an image from database with supplied name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task<Picture> GetPictureByName(string name)
        {
            return await _ctx.Pictures
                .Where(p => p.Name.Equals(name))
                .Include(p => p.Photographer)
                .Include(p => p.TagList)
                .Include(p => p.MetaData)
                .ThenInclude(m => m.Data)
                .Take(1)
                .SingleAsync();
        }

        public async Task<int> GetPictureIndexById(int id)
        {
            return _ctx.Pictures.IndexOf(await GetPictureById(id));
        }
        /// <summary>
        /// Updates a picture and all associated data
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        public async Task UpdatePicture(Picture p)
        {
            var tags = await _ctx.Pictures
                .Where(pi => pi.PictureId == p.PictureId)
                .SelectMany(pi => pi.TagList).ToListAsync();

            if (tags.Count > 0) _ctx.Tags.RemoveRange(tags);

            _ctx.ChangeTracker.TrackGraph(p, e =>
            {
                e.Entry.State = e.Entry.IsKeySet
                    ? EntityState.Modified
                    : EntityState.Added;
            });
            await _ctx.SaveChangesAsync();
        }
        /// <summary>
        /// Queries the database for specific images
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<IEnumerable<Picture>> Query(PictureQuery query)
        {
            var dbQuery = _ctx.Pictures
                .Where(p => p.MetaData.Data.Any(m => m.Value == query.QueryString
                                                     || p.TagList.Any(t => t.Value == query.QueryString)
                                                     || p.Photographer.LastName == query.QueryString
                                                     || p.Photographer.FirstName == query.QueryString
                                                     || p.FilePath.Contains(query.QueryString)))
                .OrderBy(picture => picture.PictureId)
                .Skip(query.Start)
                .Take(query.End - query.Start);

            switch (query.Type)
            {
                case FetchType.Full:
                    return await dbQuery
                        .Include(p => p.MetaData.Data)
                        .Include(p => p.Photographer)
                        .Include(p => p.TagList)
                        .ToListAsync();
                case FetchType.PathsOnly:
                    return await dbQuery.ToListAsync();
                default:
                    throw new ArgumentException($"Unhandled fetch type {query.Type}");
            }
        }

        public async Task RebuildPictureTable(IEnumerable<Picture> pictures)
        {
            Logger.Log(LogLevel.Information, "Removing ALL picture entries form database");
            _ctx.Pictures.RemoveRange(_ctx.Pictures);
            Logger.Log(LogLevel.Information, "Adding new entries");
            await _ctx.Pictures.AddRangeAsync(pictures);
            await _ctx.SaveChangesAsync();
        }

        public async Task RemoveOldFromDb(IEnumerable<string> paths)
        {
            var range = _ctx.Pictures.Where(w => !paths.Contains(w.FilePath));
            _ctx.Pictures.RemoveRange(range);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<string>> FilterNewPaths(IEnumerable<string> newPaths)
        {
            var oldPaths = await _ctx.Pictures.Select(p => p.FilePath).ToListAsync();
            return newPaths.Where(newPath => oldPaths.All(old => old != newPath));
        }

        public async Task InsertAll(IEnumerable<Picture> pictures)
        {
            _ctx.Pictures.AddRange(pictures);
            await _ctx.SaveChangesAsync();
        }


        public async Task<Photographer> GetPhotographerById(int id)
        {
            return await _ctx.Photographer.SingleAsync(p => p.Id == id);
        }

        public async Task<Photographer> CreatePhotographer(Photographer p)
        {
            _ctx.Photographer.Add(p);
            await _ctx.SaveChangesAsync();
            return p;
        }

        public async Task<IEnumerable<Photographer>> GetPhotographers()
        {
            return await _ctx.Photographer.ToListAsync();
        }

        public async Task RemovePhotographer(int id)
        {
            _ctx.Photographer.Remove(await GetPhotographerById(id));
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdatePhotographer(Photographer photographer)
        {
            var currentPhotographer = await GetPhotographerById(photographer.Id);
            currentPhotographer.FirstName = photographer.FirstName;
            currentPhotographer.LastName = photographer.LastName;
            currentPhotographer.Birthday = photographer.Birthday;
            currentPhotographer.Notes = photographer.Notes;
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<(string, int)>> TagReport()
        {
            //sql lite is not able to execute this will fetch all data to memory and grp and count locally
            var tags = _ctx.Tags
                .Join(_ctx.Pictures,
                    tag => tag.PictureId,
                    picture => picture.PictureId,
                    (tag, picture) => new {tag, picture})
                .GroupBy(col => col.tag.Value)
                .Select(col => new {tag = col.Key, count = col.Count()});

            var tagCount = await tags.ToListAsync();
            return tagCount.Select(tc => (tc.tag, tc.count));
        }
    }
}
