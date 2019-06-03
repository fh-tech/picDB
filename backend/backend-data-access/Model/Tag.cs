using System.ComponentModel.DataAnnotations.Schema;

namespace backend_data_access.Model
{
    public class Tag
    {
        public int Id { get; set; }

        [ForeignKey("PictureId")] public int PictureId { get; set; }

        public string Value { get; set; }
    }
}
