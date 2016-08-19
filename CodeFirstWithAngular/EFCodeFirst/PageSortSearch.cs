using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCodeFirst
{
    public class PageSortSearch
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public string sort { get; set; }
        public int totalItems { get; set; }
        public string sortBy { get; set; }
    }
}
