using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCodeFirst
{
    public class SchoolContext : DbContext 
    {
        public SchoolContext()
            : base("name=SchoolDBConnectionString")
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Standard> Standards { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<SystemUser> SystemUsers { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Configure domain classes using Fluent API here
            //base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Student>().HasKey<int>(s => s.StudentID);
           // modelBuilder.Entity<Student>().HasRequired(p => p.StudentName);
           // modelBuilder.Configurations.Add(new StudentMap());

           modelBuilder.Entity<Student>().Property(yc => yc.StudentName).HasColumnName("Name");
        }
    }
}
