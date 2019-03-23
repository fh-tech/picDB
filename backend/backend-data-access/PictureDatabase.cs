using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using backend_data_access.Model;

namespace backend_data_access
{
    public class PictureDatabase
    {
        private PicDbContext _ctx;


        public PictureDatabase(PicDbContext ctx)
        {
            _ctx = ctx;
        }

        public IEnumerable<Picture> GetPictureById(int id)
        {
            return _ctx.Pictures.Where(p => p.PictureId == id);
        }

        public void CreatePicture(Picture p)
        {
            _ctx.Pictures.Add(p);
        }

        public void CreatePhotographer(Photographer p)
        {
            _ctx.Photographer.Add(p);
        }

        public IEnumerable<Photographer> GetPhotographers()
        {
            return _ctx.Photographer;
        }


        public IEnumerable<Picture> Query(PictureQuery query)
        {
            return _ctx.Pictures
                .Where(p => p.MetaData.data.Any(m => m.Value == query.QueryString
                         || p.Photographer.LastName == query.QueryString
                         || p.Photographer.FirstName == query.QueryString
                         || p.FilePath.Contains(query.QueryString)))
                .Skip(query.Start)
                .Take(query.End - query.Start);
        }
    }
}
