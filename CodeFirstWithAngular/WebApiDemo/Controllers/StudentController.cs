using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EFCodeFirst;
using WebApiDemo.ActionFilters;
using System.Data.Entity;

namespace WebApiDemo.Controllers
{
    [AuthorizationRequired]
    public class StudentController : ApiController
    {
        [Route("SaveStudent")]
        [HttpPost]
        public void SaveUser(Student student)
        {
            SchoolContext schoolContext = new SchoolContext();
            schoolContext.Students.Add(student);
            if (student.StudentID > 0)
                schoolContext.Entry(student).State = EntityState.Modified;
            schoolContext.SaveChanges();
        }

        [Route("GetStudent")]
        [HttpPost]
        public IList<Student> Get(EFCodeFirst.PageSortSearch pageSortSearch)
        {
            SchoolContext schoolContext = new SchoolContext();
            int TotalRecord = schoolContext.Students.ToList().Count;
            int TotalSkip = (pageSortSearch.pageNumber - 1) * pageSortSearch.pageSize;
            if (TotalRecord != 0 && TotalRecord == TotalSkip)
            {
                TotalSkip = (pageSortSearch.pageNumber - 2) * pageSortSearch.pageSize;
            }
            List<Student> students = new List<Student>();
            var propertyInfo = typeof(Student).GetProperty(pageSortSearch.sortBy);

            if (pageSortSearch.sort == HelperClass.Common.OrderDirection.desc.ToString())
                students = schoolContext.Students.AsEnumerable().OrderByDescending(x => propertyInfo.GetValue(x, null)).Skip(TotalSkip).Take(pageSortSearch.pageSize).ToList();
            else
                students = schoolContext.Students.AsEnumerable().OrderBy(x => propertyInfo.GetValue(x, null)).Skip(TotalSkip).Take(pageSortSearch.pageSize).ToList();



            if (students != null)
                students[0].pageSortSearch.totalItems = TotalRecord;

            return students;
        }

        [Route("GetStudent/{id}")]
        public Student GetStudent(int id)
        {
            SchoolContext schoolContext = new SchoolContext();
            Student student = schoolContext.Students.Where(a => a.StudentID == id).FirstOrDefault();
            if (student == null)
                student = new Student();
            return student;
        }

        [Route("DeleteStudent/{id}")]
        [HttpGet]
        public void DeleteStudent(int id)
        {
            SchoolContext schoolContext = new SchoolContext();
            schoolContext.Students.Remove(schoolContext.Students.Where(x => x.StudentID == id).FirstOrDefault());
            schoolContext.SaveChanges();
        }

    }
}