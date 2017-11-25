using Abstracts;
using BuisniessLogic;
using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Practices.Unity;
namespace ProiectDiploma.Controllers
{
    
    public class UserController : ApiController
    {
        
private IUserService service;
    
       
        [HttpGet]
         public IEnumerable<StudentDetailsDto> GetUserData()
         {
            service = DIContainerST.GetInstance().Resolve<IUserService>();
             var user = service.GetAll();
             return user;
         }
        [HttpPost]
       
        public IHttpActionResult PostStudentData(StudentDetailsDto student)
        {
            
                service = DIContainerST.GetInstance().Resolve<IUserService>();
                service.AddOrUpdateStudent(student);
                 return Ok();
        }

    }
}
