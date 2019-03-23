using backend_data_access.Model;
using Microsoft.EntityFrameworkCore;

namespace backend_data_access
{
    public class PicDbContext : DbContext
    {
        public PicDbContext(DbContextOptions contextOptions) : base(contextOptions)
        {
        }

        internal DbSet<Picture> Pictures { get; set; }
        internal DbSet<MetaData> Metadata { get; set; }
        internal  DbSet<Photographer> Photographer { get; set; }
    }
}
