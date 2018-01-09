using BusinessObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface IUserRoleService
    {
        IEnumerable<ApplicationRoleDto> GetAllRoles();

        IEnumerable<ApplicationRoleDto> GetUserRoleById(IEnumerable<string> userRoleId);
       
    }
}
