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
        ApplicationUserDto GetUserById(object id);
        string GetUserByUserName(string userName);
        ItemsPaginingParametersDto GetUsersOnPage(ItemsPaginingParametersDto parameters);
        IEnumerable<ApplicationUserDto> GetAllUsers();
        string InitDetails(object userId);
        void DeleteUser(object id);
        void AddOrUpdateUser(ApplicationUserDto user);

       

    }
}
