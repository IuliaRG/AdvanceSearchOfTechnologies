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
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        
private IUserService service;


        [Route("api/User/GetAll")]
        public IEnumerable<ApplicationUserDto> GetAll()
          {
             service = DIContainerST.GetInstance().Resolve<IUserService>();
              var user = service.GetAllUsers();
              return user;
          }
        [Route("api/User/{id}")]
        public ApplicationUser GetUserByID(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            var user = service.GetUser(id);
            return user;
        }

        
         public IEnumerable<ApplicationUserDto> GetPageItems()
         {
             service = DIContainerST.GetInstance().Resolve<IUserService>();
             ItemsPaginingParametersDto itemPage=  new ItemsPaginingParametersDto();
             itemPage.ItemsOnPage = 4;
             itemPage.PageNumber = 1;

             var user = service.GetUsersOnPage(itemPage);
             return user;
         }
        [Route("api/User")]

         public IHttpActionResult PostUser(ApplicationUserDto user)
         {

                 service = DIContainerST.GetInstance().Resolve<IUserService>();
                 service.AddOrUpdateUser(user);
                  return Ok();
         }
        [HttpDelete]

        public IHttpActionResult Delete(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.DeleteUser(id);
            return Ok();
        }

    }
}
