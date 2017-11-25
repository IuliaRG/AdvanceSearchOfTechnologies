using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Mapper
{
    public static class UserDetailsMapper
    {
        public static IEnumerable<UserDetailsDto> ToUserDetailsDtos(this IEnumerable<UserDetails> userDetails)
        {
            var result = userDetails.Select(it => new UserDetailsDto()
            {
                Id = it.Id,
                Name = it.Name,
                Address = it.Address
            });

            return result;
        }
    
    public static UserDetails FromUserDetailsDtos(UserDetailsDto userDetailsDto)
    {
        var entityUser = new UserDetails();
            if (userDetailsDto.Id.HasValue)
                entityUser.Id = userDetailsDto.Id.Value;
        entityUser.Name = userDetailsDto.Name;
        entityUser.Address = userDetailsDto.Address;


        return entityUser;
    }
}
}