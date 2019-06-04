using System;
using backend_server.Controllers.validators;
using Xunit;

namespace backend_tests.Controllers.validators
{
    public class BirthdayAttributeTest
    {

        [Fact]
        public void TestWithPastDate()
        {
            var validator = new BirthdayAttribute();
            Assert.True(validator.IsValid(DateTime.Now.Subtract(TimeSpan.FromDays(365*10))));
        }

        [Fact]
        public void TestWithYesterdayDate()
        {
            var validator = new BirthdayAttribute();
            Assert.True(validator.IsValid(DateTime.Now.Subtract(TimeSpan.FromDays(1))));
        }

        [Fact]
        public void TestWithTodayDateShouldFail()
        {
            var validator = new BirthdayAttribute();
            Assert.False(validator.IsValid(DateTime.Now));
        }

        [Fact]
        public void TestWithTomorrowDateShouldFail()
        {
            var validator = new BirthdayAttribute();
            Assert.False(validator.IsValid(DateTime.Now.AddDays(1)));
        }

    }
}
