using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Mapper
{
    public static class UserMapper
    {
        public static IEnumerable<UserDetailsDto> ToUserDetailsDtos(this IEnumerable<UserDetails> userDetails)
        {
            var result = userDetails.Select(it => new UserDetailsDto()
            {
                Id = it.Id,
                FirstName = it.FirstName,
                LastName = it.LastName,
                Address = it.Address
            });

            return result;
        }
        public static IEnumerable<ApplicationUserDto> ToApplicationUserDtos(this IEnumerable<ApplicationUser> user)
        {
            var result = user.Select(it => new ApplicationUserDto()
            {
                Id = it.Id,
                Email = it.Email,
                UserName = it.UserName,
                IsDeleted = it.IsDeleted,
                IsActive = it.IsActive,
               UserDetailsDto = it.UserDetails.ToUserDetailsDto()

            });

            return result;
        }
        public static ApplicationUserDto ToApplicationUserDto(this ApplicationUser user)
        {
            var result = new ApplicationUserDto();
            result.Id = user.Id;
            result.Email = user.Email;
            result.UserName = user.UserName;
            result.IsDeleted = user.IsDeleted;
            result.IsActive = user.IsActive;
            result.UserDetailsDto = user.UserDetails.ToUserDetailsDto();

            return result;
        }
        public static ApplicationUser FromApplicationUserDto(this ApplicationUserDto applicationDetailsDto, ApplicationUser entityApplicationDetails)
        {
            entityApplicationDetails = new ApplicationUser();
            entityApplicationDetails.Email = applicationDetailsDto.Email;
            entityApplicationDetails.UserName = applicationDetailsDto.UserName;
            entityApplicationDetails.IsDeleted = applicationDetailsDto.IsDeleted;
            entityApplicationDetails.IsActive = applicationDetailsDto.IsActive;
            entityApplicationDetails.UserDetails = applicationDetailsDto.UserDetailsDto.FromUserDetailsDtos();

            return entityApplicationDetails;
        }
       

        public static UserDetails FromUserDetailsDtos(this UserDetailsDto userDetailsDto)
    {
        var entityUser = new UserDetails();
        if (userDetailsDto.Id.HasValue)
         entityUser.Id = userDetailsDto.Id.Value;
        entityUser.FirstName = userDetailsDto.FirstName;
         entityUser.LastName = userDetailsDto.LastName;
            entityUser.Address = userDetailsDto.Address;

        return entityUser;
    }
        public static UserDetailsDto ToUserDetailsDto(this UserDetails userDetails)
        {
            var dtoUser = new UserDetailsDto();
            dtoUser.Id = userDetails.Id;
            dtoUser.FirstName = userDetails.FirstName;
            dtoUser.LastName = userDetails.LastName;
            dtoUser.Address = userDetails.Address;

            return dtoUser;
        }
    }
}