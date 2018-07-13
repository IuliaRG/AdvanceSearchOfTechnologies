using BusinessObjects.Dto;
using BusinessObjects.Mapper;
using Newtonsoft.Json;
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
        public static TextAnalyticsDto ToTextAnalyticsDocuments(this UserReviewDto review)
        {
            var result = new TextAnalyticsDto();
            result.Documents= new List<TextAnalyticsDocumentsDto>();
            result.Documents.Add(review.ToTextAnalyticsDocumentsDto());
            return result;
        }
        public static TextAnalyticsDocumentsDto ToTextAnalyticsDocumentsDto(this UserReviewDto review)
        {
            var document = new TextAnalyticsDocumentsDto();
            document.Id = review.ApplicationUserId.ToString();
            document.Text = review.Content;
            return document;
        }
        public static IEnumerable<UserReviewDto> ToUserReviewDtos(this IEnumerable<UserReview> userReview)
        { 
           var result = userReview.Select(it => new UserReviewDto()
           {
              Content = it.Content,
              Sentiment = it.Sentiment,
             //  ProductName = it.ProductDetails_Id,

           });

            return result;
        }
        public static UserReview FromUserReviewDto(this UserReview entityUserReview, UserReviewDto userReviewDto)
        {
            entityUserReview.ApplicationUserId = userReviewDto.ApplicationUserId;
            entityUserReview.Content = userReviewDto.Content;
            entityUserReview.ProductDetails_Id = userReviewDto.ProductId;
            entityUserReview.ProductCode = userReviewDto.ProductCode;
            entityUserReview.Brand = userReviewDto.Brand;
            entityUserReview.Sentiment =  userReviewDto.TextAnalyticRespons.Documents.Select(x => x.Score).FirstOrDefault();

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
