using Abstracts;
using BusinessObjects.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObjects.Dto;
using BusinessObjects.Mapper;

namespace BuisniessLogic
{
    
    public class UserRoleService : IUserRoleService
    {
        IRepository<ApplicationRole> roleRepository;
        public UserRoleService(IRepository<ApplicationRole> roleRepository)
        {
            this.roleRepository = roleRepository;
        }
        public IEnumerable<ApplicationRoleDto> GetAllRoles()
        {
            var userEnitiy = roleRepository.GetAll();
            var result = userEnitiy.ToApplicationRolesDtos();

            return result;
        }
        public IEnumerable<ApplicationRoleDto>  GetUserRoleById(IEnumerable<string> userRoleId)
        {
           var entity  = roleRepository.GetAll().Where(r => userRoleId.Contains(r.Id));
           var result = entity.ToApplicationRolesDtos();

            return result;
        }
    }
}