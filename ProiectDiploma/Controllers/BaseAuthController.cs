using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using ProiectDiploma.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ProiectDiploma.Controllers
{
    public  class BaseAuthController : ApiController
    {
        protected ApplicationUserManager _userManager;
        public async Task<IHttpActionResult> AdminAuthorization(string id)
        {
           
            var isAdmin = await UserManager.IsInRoleAsync(id, "Admin");
            if (!isAdmin)
            {
                return Unauthorized();
            }
            return Ok();
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            protected set
            {
                _userManager = value;
            }
        }
    }
}