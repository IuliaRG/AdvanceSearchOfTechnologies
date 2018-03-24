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
            var allUsers = userRepository.GetAll();
            var activeUsers = allUsers.AsQueryable().Where(x => x.IsDeleted == false);
            var users = activeUsers;
            if (!string.IsNullOrEmpty(paginationParameters.SortField))
            {
                users = activeUsers.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
            }
            if (!string.IsNullOrEmpty(paginationParameters.SearchText))
            {
                users = activeUsers.Filter("Email", paginationParameters.SearchText);
                users = (from user in activeUsers.Where( user => user.UserDetails.Address.Contains(paginationParameters.SearchText)|| user.UserDetails.FirstName.Contains(paginationParameters.SearchText) || user.UserDetails.LastName.Contains(paginationParameters.SearchText) || user.UserName.Contains(paginationParameters.SearchText)||  user.Email.Contains(paginationParameters.SearchText))
                                      select user).AsQueryable();
                if (!string.IsNullOrEmpty(paginationParameters.SortField))
                {
                    users = users.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
                }
            }
            int totalNrUsers = users.Count();
            int currentPage = paginationParameters.PageNumber;
            int lastPage = (int)Math.Ceiling(totalNrUsers / (double)paginationParameters.ItemsOnPage);
            var usersToSend = users.ToApplicationUserDtos().Skip((currentPage - 1) * paginationParameters.ItemsOnPage).Take(paginationParameters.ItemsOnPage).ToList();
            ItemsPaginingParametersDto pageDto = new ItemsPaginingParametersDto();
            pageDto.MaxPageItems = totalNrUsers;
            pageDto.CurrentPage = currentPage;
            pageDto.LastPage = lastPage;
            pageDto.Data = usersToSend;
            pageDto.SearchText = paginationParameters.SearchText;

            return pageDto;
        }
       
         public string InitDetails(object userId)
        {
            var entity = userRepository.GetById(userId);
            entity.TokenGuid= Guid.NewGuid().ToString(); 
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
            ApplicationUser entityUser =null;
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
