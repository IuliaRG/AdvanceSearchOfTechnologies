using BusinessObjects.Dto;
using BusinessObjects.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Mapper
{
   public static class RoleMapper
    {
        public static IEnumerable<ApplicationRoleDto> ToApplicationRolesDtos(this IEnumerable<ApplicationRole> user)
        {
            var result = user.Select(it => new ApplicationRoleDto()
            {
                Id=it.Id,
                Name = it.Name

            });

            return result;
        }
        public static ApplicationRoleDto ToApplicationRoleDto(this ApplicationRole user)
        {
            var result = new ApplicationRoleDto();
            result.Id = user.Id;
            result.Name = user.Name;
            return result;
        }
        public static IEnumerable<ApplicationUserRoleDto> ToApplicationUserRolesDtos(this IEnumerable<ApplicationUserRole> user)
        {
            var result = user.Select(it => new ApplicationUserRoleDto()
            {
               RoleId=it.RoleId,
               UserId=it.UserId
            });

            return result;
        }
        public static ApplicationUserRoleDto ToApplicationUserRoleDto(this ApplicationUserRole user)
        {
            var result = new ApplicationUserRoleDto();
            result.RoleId = user.RoleId;
            result.UserId = user.UserId;
            return result;
        }
    }
}
