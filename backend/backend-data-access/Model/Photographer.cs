using System;

namespace backend_data_access.Model
{
    public class Photographer
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime Birthday { get; set; }

        public string Notes { get; set; }

    }
}
