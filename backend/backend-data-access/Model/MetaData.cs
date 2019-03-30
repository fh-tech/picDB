using System.Collections.Generic;

namespace backend_data_access.Model
{
    public class MetaData
    {
        public int Id { get; set; }
        public List<MetaDataEntry> Data { get; set; } = new List<MetaDataEntry>();
    }

    public class MetaDataEntry
    {
        public MetaDataType Type { get; set; }
        public int MetaDataEntryId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }

    public enum MetaDataType
    {
        Exif,
        Itpc
    }
}
