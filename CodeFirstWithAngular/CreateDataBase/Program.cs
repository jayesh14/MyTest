using EFCodeFirst;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreateDataBase
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var ctx = new SchoolContext())
            {
                //ctx.Configuration.ValidateOnSaveEnabled = false;
                Student stud = new Student() { StudentName = "New Student" };
                //ctx.Entry(stud).Property(u => u.StudentName).IsModified = true;
                ctx.Students.Add(stud);
                //ctx.Entry(stud).State = System.Data.EntityState.Added;  
                ctx.SaveChanges();
                //try
                //{
                //    Student stud = new Student() { StudentName = "New Student" };

                //    ctx.Students.Add(stud);
                //    ctx.SaveChanges();
                //}
                //catch (DbEntityValidationException ex)
                //{
                //    // Retrieve the error messages as a list of strings.
                //    var errorMessages = ex.EntityValidationErrors
                //            .SelectMany(x => x.ValidationErrors)
                //            .Select(x => x.ErrorMessage);

                //    // Join the list to a single string.
                //    var fullErrorMessage = string.Join("; ", errorMessages);

                //    // Combine the original exception message with the new one.
                //    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                //    // Throw a new DbEntityValidationException with the improved exception message.
                //    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                //}
            }
        }
    }
}
