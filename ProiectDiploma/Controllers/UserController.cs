﻿using Abstracts;
using BuisniessLogic;
using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Practices.Unity;
using BusinessObjects.Dto;
using Microsoft.AspNet.Identity;

namespace ProiectDiploma.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        
private IUserService service;
        [Route("GetAll")]
        public IEnumerable<ApplicationUserDto> GetAll()
          {
             service = DIContainerST.GetInstance().Resolve<IUserService>();
              var user = service.GetAllUsers();
              return user;
          }

        [Authorize]
        [Route("GetRole")]
        public ApplicationUserDto GetRole()
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            var user = service.GetUserRolesById(id);
         
            return user;
        }

        [Route("")]
        public ApplicationUserDto GetUserByID(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            var user = service.GetUserById(id);
            return user;
        }

        [Authorize]
        [Route("CurrentUser")]
        public ApplicationUserDto GetUserByUserName()
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            var user = service.GetUserById(id);
            return user;
        }

        [Route("UsersPage")]
        public ItemsPaginingParametersDto UsersPage(ItemsPaginingParametersDto pageDto)
         {
             service = DIContainerST.GetInstance().Resolve<IUserService>();
             var user = service.GetUsersOnPage(pageDto);
             return user;
         }

        [Route("AddOrUpdate")]
         public IHttpActionResult AddOrUpdate(ApplicationUserDto user)
         {
                 service = DIContainerST.GetInstance().Resolve<IUserService>();
                 service.AddOrUpdateUser(user);
                 return Ok();
         }
        
        [Route("Delete/{id}")]
        public IHttpActionResult Delete(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.DeleteUser(id);
            return Ok();
        }
    }
}
