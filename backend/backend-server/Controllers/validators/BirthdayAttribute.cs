using System;
using System.ComponentModel.DataAnnotations;

namespace backend_server.Controllers.validators
{
    public class BirthdayAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {

            var birthday = (DateTime)value;

            return birthday.Date >= DateTime.Now.Date ? new ValidationResult(GetErrorMessage()) : ValidationResult.Success;
        }

        public static string GetErrorMessage()
        {
            return "Birthday can not lie in future";
        }
    }
}
