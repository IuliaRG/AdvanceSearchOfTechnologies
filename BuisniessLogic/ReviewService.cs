using Abstracts;
using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
  public  class ReviewService : IReviewService
    {
        IRepository<UserReview> userReviewRepository;
        IRepository<ApplicationUser> userRepository;

        public ReviewService(IRepository<UserReview> userReviewRepository, IRepository<ApplicationUser>  userRepository)
        {
            this.userReviewRepository = userReviewRepository;
            this.userRepository = userRepository;

        }
        public void AddOrUpdateReview(UserReviewDto user)
        {
            var entity = new UserReview();
            entity.FromUserReviewDto(user);
            userReviewRepository.Insert(entity);
            userReviewRepository.Save();
        }
        public IEnumerable<UserReviewDto> GetAllReviews()
        {
            var userEnitiy = userReviewRepository.GetAll();
            var result = userEnitiy.ToUserReviewDtos();

            return result;
        }
        public List<string> GetReviewsByUserId(object id)
        {
            var allReviews = userReviewRepository.GetAll();
            var reviews = allReviews.Where(it => id.Equals(it.ApplicationUserId)).Select(r => r.Content).ToList();
         //   string userReviews = string.Join("", reviews);
            var entity = new UserReview();
            return reviews;
        }
        public void DeleteReview(object id)
        {
            throw new NotImplementedException();
        }
    }
}
