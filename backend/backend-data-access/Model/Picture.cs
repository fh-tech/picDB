using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace backend_data_access.Model
{
    public class Picture
    {
        public int PictureId { get; set; }

        public string Name => Path.GetFileName(FilePath);

        public string FilePath { get; set; }
        public Photographer Photographer { get; set; }

        [Required] public MetaData MetaData { get; set; }

        [JsonIgnore] [Required] public List<Tag> TagList { get; set; } = new List<Tag>();

        [NotMapped]
        public string[] Tags
        {
            get => TagList.Select(t => t.Value).ToArray();
            set => TagList = value == null
                ? new List<Tag>()
                : value.Select(v => new Tag {Value = v}).ToList();
        }
    }
}
