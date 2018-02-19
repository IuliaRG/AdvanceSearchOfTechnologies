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
        [Route("RegisterAdmin")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.InitDetails(user.Id);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
        [Route("AddUser")]
        public async Task<IHttpActionResult> AddUser( ApplicationUserDto userDto)
        {
            var id = RequestContext.Principal.Identity.GetUserId();
            await AdminAuthorization(id);
            var user = new ApplicationUser() { UserName = userDto.Email, Email = userDto.Email };
            IdentityResult result = await UserManager.CreateAsync(user, userDto.Password);
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.InitDetails(user.Id);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            service = DIContainerST.GetInstance().Resolve<IUserService>();
            service.AddOrUpdateUser(userDto);

            return Ok();
        }
        [Route("AddNewRole")]
        public async Task<IHttpActionResult> AddNewRole(ApplicationRoleDto model)
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