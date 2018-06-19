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
        IEnumerable<ApplicationUserDto> GetAllUsers();
        string InitDetails(object userId);
        void DeleteUser(object id);
        void AddOrUpdateUser(ApplicationUserDto user);
        ApplicationUserDto GetUserById(object id);
        void ValidateEmail(string userName, string token);
        ItemsPaginingParametersDto GetUsersOnPage(ItemsPaginingParametersDto parameters);
        ApplicationUserDto GetUserRolesById(object id);
    }
}
