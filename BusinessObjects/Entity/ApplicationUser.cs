﻿using BusinessObjects.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class ApplicationUser : IdentityUser
    {
       // private UserManager<IdentityUser> userManager;
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
       
        public Boolean IsDeleted { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsValidate { get; set; }
        public string TokenGuid { get; set; }
        public virtual UserDetails UserDetails { get; set; }

    }
}
