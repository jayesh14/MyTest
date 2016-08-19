using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCodeFirst
{
    public class Student 
    {
        public Student()
        {
            pageSortSearch = new PageSortSearch();
        }
        [Key]
        public int StudentID { get; set; }

        [Required]
        public string StudentName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public byte[] Photo { get; set; }
        public decimal Height { get; set; }
        public float Weight { get; set; }

        public Standard Standard { get; set; }

        [NotMapped]
        public PageSortSearch pageSortSearch { get; set; }



    }
}
