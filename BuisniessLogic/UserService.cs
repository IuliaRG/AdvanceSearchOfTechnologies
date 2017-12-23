using Abstracts;
using BusinessObjects;
using BusinessObjects.Mapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
    public class UserService : IUserService
    {
        IRepository<UserDetails> userDetailsRepository;
        IRepository<ApplicationUser> userRepository;
        IRepository<StudentDetails> studentDetailsRepository;
        IRepository<TeacherDetails> teacherDetailsRepository;
        

        public UserService(IRepository<UserDetails> userDetailsRepository, IRepository<ApplicationUser> userRepository, IRepository<TeacherDetails> teacherDetailsRepository, IRepository<StudentDetails> studentDetailsRepository)
        {
            this.userDetailsRepository = userDetailsRepository;
            this.userRepository = userRepository;
            this.studentDetailsRepository = studentDetailsRepository;
            this.teacherDetailsRepository = teacherDetailsRepository;
        }

      
        public IEnumerable<ApplicationUserDto> GetAllUsers()
        {
            var userEnitiy = userRepository.GetAll();
            var result = userEnitiy.ToApplicationUserDtos();
            return result;
        }
        public IEnumerable<ApplicationUserDto> GetUsersOnPage(ItemsPaginingParametersDto paginationParameters)
        {
            var users= GetAllUsers();
            IEnumerable<ApplicationUserDto> allUsers = users.AsQueryable();
            var usersOrderByName=(from user in users.
                         OrderBy(a => a.UserDetailsDto.FirstName)
                        select user).AsQueryable();
            if (paginationParameters.SearchText != null)
            {
                allUsers =
               from user in users
               where (user.UserDetailsDto.FirstName.Contains(paginationParameters.SearchText) || user.UserDetailsDto.LastName.Contains(paginationParameters.SearchText) || user.UserDetailsDto.Address.Contains(paginationParameters.SearchText) )
               select user;
                
            }
            int count = allUsers.Count();
            int CurrentPage = paginationParameters.PageNumber;
            int TotalPages = (int)Math.Ceiling(count / (double)paginationParameters.ItemsOnPage);
            var usersToSend = allUsers.Skip((CurrentPage - 1) * paginationParameters.ItemsOnPage).Take(paginationParameters.ItemsOnPage).ToList();
            return usersToSend;
            
        }
       

        public void InitDetails(object userId)
        {

            var entity = userRepository.GetById(userId);
         entity.UserDetails = new UserDetails();
            userRepository.Save();
           
         

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
                entityUser = userRepository.GetAll().FirstOrDefault(it => it.UserName == user.UserName);
                entityUser.FromApplicationUserDto(user);
                userRepository.Insert(entityUser);
            }

            userRepository.Save();
        }
       

        public void DeleteUser(object id)
        {
            var entity=userRepository.GetById(id).ToApplicationUserDto();
            entity.IsDeleted = true;
            userRepository.Save();
        }

        public ApplicationUserDto GetUserById(object id)
        {
            var entity = userRepository.GetById(id).ToApplicationUserDto();
            return entity;


        }
    }
}
