using System.Collections.Generic;
using System.Linq;
using backend_data_access.Model;

namespace backend_server.Model
{
    public class ImageReportViewModel
    {

        public ImageReportViewModel(Picture p)
        {
            _picture = p;
        }

        private Picture _picture;

        public string ImagePath => _picture.FilePath;
        public string ImageName => _picture.Name;

        public IEnumerable<MetaDataEntry> ImaageExifData => _picture.MetaData.Data.Where(m => m.Type == MetaDataType.Exif);
        public IEnumerable<MetaDataEntry> ImaageItpcData => _picture.MetaData.Data.Where(m => m.Type == MetaDataType.Itpc);

        public Photographer Photographer => _picture.Photographer;
    }
}
