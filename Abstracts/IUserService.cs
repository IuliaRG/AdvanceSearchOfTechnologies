using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
    public interface IUserService
    {
        ApplicationUser GetUserById(object id);
        IEnumerable<ApplicationUserDto> GetUsersOnPage(ItemsPaginingParametersDto parameters);
        IEnumerable<ApplicationUserDto> GetAllUsers();
        void InitDetails(object userId);
        void DeleteUser(object id);
        void AddOrUpdateUser(ApplicationUserDto user);

    }
}
