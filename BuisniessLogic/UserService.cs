using Abstracts;
using BusinessObjects;
using BusinessObjects.Dto;
using BusinessObjects.Entity;
using BusinessObjects.Mapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public class UserService : IUserService
    {
        IRepository<UserDetails> userDetailsRepository;
        IRepository<ApplicationUser> userRepository;
     
        IRepository<ApplicationRole> roleRepository;


        public UserService(IRepository<UserDetails> userDetailsRepository, IRepository<ApplicationUser> userRepository, IRepository<ApplicationRole> roleRepository)
        {
            this.userDetailsRepository = userDetailsRepository;
            this.userRepository = userRepository;
            this.roleRepository = roleRepository;
        }

      
        public IEnumerable<ApplicationUserDto> GetAllUsers()
        {
            var userEnitiy = userRepository.GetAll();
            var result = userEnitiy.ToApplicationUserDtos();
            return result;
        }

        public ItemsPaginingParametersDto GetUsersOnPage(ItemsPaginingParametersDto paginationParameters)
        {
            var allUsers = userRepository.GetAll().Where(x => x.IsDeleted == false);
            var data = allUsers.AsQueryable();
            if (!string.IsNullOrEmpty(paginationParameters.SortField))
            {
                allUsers = data.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
            }
            if (!string.IsNullOrEmpty(paginationParameters.SearchText))
            {
                allUsers = (from user in data.Where( user => user.UserDetails.Address.Contains(paginationParameters.SearchText)|| user.UserDetails.FirstName.Contains(paginationParameters.SearchText) || user.UserDetails.LastName.Contains(paginationParameters.SearchText) || user.UserName.Contains(paginationParameters.SearchText)||  user.Email.Contains(paginationParameters.SearchText))
                                      select user).AsQueryable();
            }

            int count = allUsers.Count();
            var result = allUsers.ToApplicationUserDtos();
            int currentPage = paginationParameters.PageNumber;
            int pageSize = paginationParameters.ItemsOnPage;
            int TotalPages = (int)Math.Ceiling(count / (double)paginationParameters.ItemsOnPage);
            var usersToSend = result.Skip((currentPage - 1) * paginationParameters.ItemsOnPage).Take(paginationParameters.ItemsOnPage).ToList();
            var totalCount = count;
            var previousPage = currentPage > 1 ? "Yes" : "No";
            var nextPage = currentPage < TotalPages ? "Yes" : "No";
            ItemsPaginingParametersDto dto = new ItemsPaginingParametersDto();
            dto.MaxPageItems = totalCount;
            dto.CurrentPage = currentPage;
            dto.PreviousPage = previousPage;
            dto.NextPage = nextPage;
           dto.Data = usersToSend;
            dto.SearchText = paginationParameters.SearchText;
            return dto;
        }
       
        public string InitDetails(object userId)
        {

            var entity = userRepository.GetById(userId);
            entity.TokenGuid= Guid.NewGuid().ToString(); ;
            entity.UserDetails = new UserDetails();
            userRepository.Save();
            return entity.TokenGuid;
        }
       
        public void ValidateEmail(string userName,string token)
        {
          var  entityUser = userRepository.GetAll().FirstOrDefault(it => it.UserName == userName);
            if (entityUser != null && token == entityUser.TokenGuid)
            {
                entityUser.IsValidate = true;
                userRepository.Update(entityUser);
                userRepository.Save();
            }
            else
            {
                throw (new Exception("User not found"));
            }
        }
        
        public void AddOrUpdateUser(ApplicationUserDto user)
        {
            ApplicationUser entityUser = null;
            if (user.UserName != null)
            {
                entityUser = userRepository.GetAll().FirstOrDefault(it => it.UserName == user.UserName);
               entityUser.FromApplicationUserDto(user);
               
                userRepository.Update(entityUser);
            }
            else
            {
                user.UserName = user.Email;
                entityUser = userRepository.GetAll().FirstOrDefault(it => it.UserName == user.UserName);
                entityUser.FromApplicationUserDto(user);
                userRepository.Update(entityUser);
            }

            userRepository.Save();
        }
       

        public void DeleteUser(object id)
        {
            //  var entity=userRepository.GetById(id).ToApplicationUserDto();
            var entity = userRepository.GetById(id);
            entity.IsDeleted = true;
            userRepository.Update(entity);
            userRepository.Save();
        }

        public ApplicationUserDto GetUserById(object id)
        {
            var entity = userRepository.GetById(id).ToApplicationUserDto();
            return entity;


        }

        public ApplicationUserDto GetUserRolesById(object id)
        {
            var allRoles = roleRepository.GetAll();
            var userRoleIds = userRepository.GetById(id).Roles.Select(r => r.RoleId).ToList();
            var userRoles = allRoles.Where(it => userRoleIds.Contains(it.Id)).Select(r => r.Name).ToList();
            var entity = userRepository.GetById(id).ToApplicationUserWithRoleDto(userRoles);
            return entity;

        }

       
    }
}
