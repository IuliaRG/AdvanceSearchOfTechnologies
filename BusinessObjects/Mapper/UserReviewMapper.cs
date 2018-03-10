using BusinessObjects.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects
{
   public static class UserReviewMapper
    {
        public static UserReviewDto ToUserReviewDto(this UserReview review)
        {
            var result = new UserReviewDto();
            result.Content = review.Content;
            result.ApplicationUserDto.UserDetailsDto = review.ApplicationUser.UserDetails.ToUserDetailsDto();
            return result;
        }
        public static IEnumerable<UserReviewDto> ToUserReviewDtos(this IEnumerable<UserReview> userReview)
        { 
           var result = userReview.Select(it => new UserReviewDto()
           {
              Content = it.Content,
           });

            return result;
        }
        public static UserReview FromUserReviewDto(this UserReview entityUserReview, UserReviewDto userReviewDto)
        {
            entityUserReview.ApplicationUserId = userReviewDto.ApplicationUserId;
            entityUserReview.Content = userReviewDto.Content;
           
            return entityUserReview;
        }
        public static UserReviewDto ToCurrentUserReviewDto(this UserReview user, string review)
        {
            var result = new UserReviewDto();
            result.Content = review;
            return result;
        }

    }
}
