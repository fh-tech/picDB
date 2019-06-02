using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_data_access.Model;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Picture> GetPictureById(int id)
        {
            return await _ctx.Pictures
                .Include(p => p.Photographer)
                .Include(p => p.MetaData)
                .Include(p => p.MetaData.Data)
                .SingleAsync(picture => picture.PictureId == id);
        }

        public async Task UpdatePicture(Picture p)
        {
            _ctx.ChangeTracker.TrackGraph(p, e =>
            {
                e.Entry.State = e.Entry.IsKeySet
                    ? EntityState.Modified
                    : EntityState.Added;
            });
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<Picture>> Query(PictureQuery query)
        {
            var dbQuery = _ctx.Pictures
                .Where(p => p.MetaData.Data.Any(m => m.Value == query.QueryString
                                                     || p.Photographer.LastName == query.QueryString
                                                     || p.Photographer.FirstName == query.QueryString
                                                     || p.FilePath.Contains(query.QueryString)))
                .Skip(query.Start)
                .Take(query.End - query.Start);

            switch (query.type)
            {
                case FetchType.Full:
                    return await dbQuery.Include(p => p.MetaData.Data).ToListAsync();
                case FetchType.PathsOnly:
                    return await dbQuery.ToListAsync();
                default:
                    throw new ArgumentException($"Unhandled fetch type {query.type}");
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

        public async Task<Photographer> GetPhotographerById(int id)
        {
            return await _ctx.Photographer.SingleAsync(p => p.Id == id);
        }

        public async Task<Photographer> CreatePhotographer(Photographer p)
        {
            var newPhotographer = new Photographer
            {
                FirstName = p.FirstName,
                LastName = p.LastName
            };

            await _ctx.Photographer.AddAsync(newPhotographer);
            await _ctx.SaveChangesAsync();

            return newPhotographer;
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
            currentPhotographer.FirstName = photographer.FirstName ?? currentPhotographer.FirstName;
            currentPhotographer.LastName = photographer.LastName ?? currentPhotographer.LastName;
            await _ctx.SaveChangesAsync();
        }

        public async Task RemoveOldFromDb(IEnumerable<string> paths)
        {
            var pics = _ctx.Pictures;
            var query = paths
                .Aggregate<string, IQueryable<Picture>>(_ctx.Pictures,
                    (current, path) => current.Where(p => p.FilePath != path));
            _ctx.RemoveRange(query);
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
    }
}
