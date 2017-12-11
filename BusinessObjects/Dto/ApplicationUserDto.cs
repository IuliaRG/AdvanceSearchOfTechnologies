using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
    public class ApplicationUserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean IsActive { get; set; }
        public UserDetailsDto UserDetailsDto { get; set; }
    }
}
