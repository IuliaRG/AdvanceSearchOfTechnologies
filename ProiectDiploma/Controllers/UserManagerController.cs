using Abstracts;
using BusinessObjects;
using BusinessObjects.Dto;
using DAL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ProiectDiploma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ProiectDiploma.Controllers
{
    [Authorize]
    [RoutePrefix("api/UserManager")]
    public class UserManagerController : BaseAuthController
    {
        private IUserService service;
        [Route("AddNewRole")]
        public async Task<IHttpActionResult> AddNewRole(RoleDto model)
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            await AdminAuthorization(id);
            var roleStore = new RoleStore<IdentityRole>(new ApplicationDbContext());
            var roleManager = new RoleManager<IdentityRole>(roleStore);
            IdentityRole role = new IdentityRole(model.Name);
            var result = await roleManager.CreateAsync(role);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            throw new NotImplementedException();
        }

        //[Authorize(Roles = "Admin")]
        [Route("AssignToRole")]
        public async Task<IHttpActionResult> AssignToRole(RegisterBindingModel model, string RoleName)
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            await AdminAuthorization(id);
            var user = await UserManager.FindByNameAsync(model.Email);
            var roles = await UserManager.GetRolesAsync(id);
            var result = await UserManager.AddToRoleAsync(user.Id, RoleName);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
        [Route("EditUser")]
        public async Task<IHttpActionResult> EditUser(ApplicationUserDto user)
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            await AdminAuthorization(id);
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.AddOrUpdateUser(user);
            return Ok();
        }
    }
}