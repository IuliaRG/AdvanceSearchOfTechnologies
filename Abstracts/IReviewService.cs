using BusinessObjects;
using BusinessObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
   public interface IReviewService
    {
        void DeleteReview(object id);
        void AddOrUpdateReview(UserReviewDto user);
        IEnumerable<UserReviewDto> GetAllReviews();
        List<string> GetReviewsByUserId(object id);
    }
}
