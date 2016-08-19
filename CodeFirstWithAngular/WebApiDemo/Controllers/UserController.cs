using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EFCodeFirst;

namespace WebApiDemo.Controllers
{
    public class UserController : ApiController
    {
       

        [Route("Get")]
        public IList<Student> Get()
        {
            SchoolContext schoolContext = new SchoolContext();
            return schoolContext.Students.Where(a => a.StudentName == "akhil").ToList();
        }

        [Route("login")]
        [HttpPost]
        public SystemUser Login(SystemUser systemUser)
        {
            SchoolContext schoolContext = new SchoolContext();
            SystemUser model = schoolContext.SystemUsers.Where(a => a.UserName == systemUser.UserName && a.Password == systemUser.Password).FirstOrDefault();
            return model;
        }


        [Route("GetToken")]
        [HttpPost]
        public Token GetToken(SystemUser systemUser)
        {
            HelperClass.TokenManagement tokenManagement = new HelperClass.TokenManagement();
            Token token = tokenManagement.GenerateToken(systemUser.SystemUserID);
            return token;
        }

        [Route("SaveUser")]
        [HttpPost]
        public void SaveUser(SystemUser systemUser)
        {
            SchoolContext schoolContext = new SchoolContext();
            schoolContext.SystemUsers.Add(systemUser);
            schoolContext.SaveChanges();
        }


    }

}