using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCodeFirst
{
    public class Product
    {
        public Product()
        {
            pageSortSearch = new PageSortSearch();
        }

        [Key]
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }


        [NotMapped]
        public PageSortSearch pageSortSearch { get; set; }
    }
}
