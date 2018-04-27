using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using BusinessObjects.Dto;

namespace BusinessObjects
{
    public class ApplicationUserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsValidate { get; set; }
        public string TokenGuid { get; set; }
        public IEnumerable<string> UserRoleId { get; set; }
        public List<string> Roles { get; set; }
        public UserDetailsDto UserDetailsDto { get; set; }
        public IEnumerable<UserReviewDto> UserReviewDto { get; set; }


    }
}
