using System.IO;

namespace backend_data_access.Model
{
    public class Picture
    {
        public int PictureId { get; set; }

        public string Name => Path.GetFileName(FilePath);

        public string FilePath { get; set; }
        public Photographer Photographer { get; set; }
        public MetaData MetaData { get; set; }
    }
}
