using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using backend_data_access.Model;
using backend_server.Model;
using Microsoft.EntityFrameworkCore;

namespace backend_data_access
{
    public class PictureDatabase
    {
        private PicDbContext _ctx;


        public PictureDatabase(PicDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Picture> GetPictureById(int id)
        {
            return await _ctx.Pictures.SingleAsync(picture =>  picture.PictureId == id);
        }

        public async Task CreatePicture(Picture p)
        {
            await _ctx.Pictures.AddAsync(p);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<Picture>> Query(PictureQuery query)
        {
            return await _ctx.Pictures
                .Where(p => p.MetaData.data.Any(m => m.Value == query.QueryString
                         || p.Photographer.LastName == query.QueryString
                         || p.Photographer.FirstName == query.QueryString
                         || p.FilePath.Contains(query.QueryString)))
                .Skip(query.Start)
                .Take(query.End - query.Start).ToListAsync();
        }


        public async Task<Photographer> GetPhotographerById(int id)
        {
            return await _ctx.Photographer.SingleAsync(p => p.Id == id);
        }

        public async Task CreatePhotographer(CreatePhotographer p)
        {
            await _ctx.Photographer.AddAsync(new Photographer()
            {
                FirstName = p.FirstName,
                LastName = p.LastName
            });

            await _ctx.SaveChangesAsync();
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
    }
}
