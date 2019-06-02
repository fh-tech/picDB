using System;
using System.ComponentModel.DataAnnotations;
using backend_server.Controllers.validators;

namespace backend_server.Model
{
    public class UpdatePhotographer
    {
        [StringLength(100, ErrorMessage = "First name can not be longer than 50.")]
        public string FirstName { get; set; }

        [StringLength(50, ErrorMessage = "Last name can not be longer than 50.")]
        [Required]
        public string LastName { get; set; }

        [DataType(DataType.Date)]
        [Birthday]
        public DateTime Birthday { get; set; }

        public string Notes { get; set; }
    }
}
