using Abstracts;
using BusinessObjects;
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
       
        public ItemsPaginingParametersDto GetUsersOnPage(ItemsPaginingParametersDto paginationParameters)
        {

            var allUsers = userRepository.GetAll();
            var data = allUsers.AsEnumerable();

            //if (!string.IsNullOrEmpty(paginationParameters.SortField))
            //{
            //    switch (paginationParameters.SortField)
            //    {
            //        case "Email":
            //            if (paginationParameters.SortDirection == "Descending")
            //                allUsers = (from user in users.
            //            OrderByDescending(a => a.Email)
            //                            select user).AsQueryable();


            //            else
            //                allUsers = (from user in users.
            //               OrderBy(a => a.Email)
            //                            select user).AsQueryable();
            //            break;
            //        case "UserName":
            //            if (paginationParameters.SortDirection == "Descending")
            //                allUsers = (from user in users.
            //             OrderByDescending(a => a.UserName)
            //                            select user).AsQueryable();


            //            else
            //                allUsers = (from user in users.
            //               OrderBy(a => a.UserName)
            //                            select user).AsQueryable();
            //            break;
            //        case "Address":
            //            if (paginationParameters.SortDirection == "Descending")
            //                allUsers = (from user in users.
            //               OrderByDescending(a => a.UserDetailsDto.Address)
            //                            select user).AsQueryable();


            //            else
            //                allUsers = (from user in users.
            //               OrderBy(a => a.UserDetailsDto.Address)
            //                            select user).AsQueryable();
            //            break;
            //        case "FirstName":
            //            if (paginationParameters.SortDirection == "Descending")
            //                allUsers = (from user in users.
            //                OrderByDescending(a => a.UserDetailsDto.FirstName)
            //                            select user).AsQueryable();


            //            else
            //                allUsers = (from user in users.
            //               OrderBy(a => a.UserDetailsDto.FirstName)
            //                            select user).AsQueryable();
            //            break;

            //        case "LastName":
            //            if (paginationParameters.SortDirection == "Descending")
            //                allUsers = (from user in users.
            //              OrderByDescending(a => a.UserDetailsDto.LastName)
            //                            select user).AsQueryable();


            //            else
            //                allUsers = (from user in users.
            //               OrderBy(a => a.UserDetailsDto.LastName)
            //                            select user).AsQueryable();
            //            break;
            //    }
            //}
           
            if (!string.IsNullOrEmpty(paginationParameters.SortField))
            {
             allUsers= data.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
             // var  x = query.OrderByField(paginationParameters.SortField, true);
            }
            if ( !string.IsNullOrEmpty(paginationParameters.SearchText))
            {
                // allUsers =
                //from user in users
                //where (user => user.Email.Contains(paginationParameters.SearchText) ||( user.UserName.Length>0 && user.UserName.Contains(paginationParameters.SearchText))|| (user.UserDetailsDto.Address.Length > 0 && user.UserDetailsDto.Address.Contains(paginationParameters.SearchText))
                //select user;
               allUsers = allUsers.Where(user => user.Email.Contains(paginationParameters.SearchText) || user.UserName.Contains(paginationParameters.SearchText));

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
            dto.SearchText = string.IsNullOrEmpty(paginationParameters.SearchText) ?
                      "No Parameter Passed" : paginationParameters.SearchText;
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
        public string GetUserByUserName(string userName)
        {

            var entity = userRepository.GetByUserName(userName);
            
            return entity.TokenGuid;
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
