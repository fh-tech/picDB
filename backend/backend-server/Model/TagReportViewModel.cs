using System.Collections.Generic;

namespace backend_server.Model
{
    public class TagReportViewModel
    {
        public IEnumerable<(string, int)> tagCount { get; set; }
    }
}
