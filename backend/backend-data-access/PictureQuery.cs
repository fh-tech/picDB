using System;
using System.Collections;
using System.Linq;
using System.Linq.Expressions;
using backend_data_access.Model;
using Microsoft.EntityFrameworkCore;

namespace backend_data_access
{
    public class PictureQuery
    {
        public int Start { get; set; } = 0;
        public int End { get; set; } = -1;

        public string QueryString { get; set; } = "";



    }
}
