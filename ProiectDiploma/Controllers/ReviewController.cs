using Abstracts;
using BusinessObjects;
using BusinessObjects.Dto;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ProiectDiploma.Controllers
{
   
    [RoutePrefix("api/Review")]
    public class ReviewController : ApiController
    {

        private IReviewService service;
        [Authorize]
        [Route("AddOrUpdate")]
        public IHttpActionResult AddOrUpdate(UserReviewDto userReview)
        {
            userReview.ApplicationUserId = RequestContext.Principal.Identity.GetUserId();
                service = DIContainerST.GetInstance().Resolve<IReviewService>();
                service.AddOrUpdateReview(userReview);
           
                return Ok();
        }
        [Route("GetAllReviews")]
        public IEnumerable<UserReviewDto> GetAll()
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            var reviews = service.GetAllReviews();
       
            return reviews;
        }
        [Route("Delete/{id}")]
        public IHttpActionResult DeleteReview(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            service.DeleteReview(id);
            return Ok();
        }

        [Route("GetReviewsById")]
        public List<string> GetReviewsById(string id)
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            var userReviews = service.GetReviewsByUserId(id);

            return userReviews;
        }
        [Route("GetBrandReviewsStatistics")]
        public ReviewStatistics GetBrandReviewsStatistics(string brandName)
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            var statistics = service.GetBrandReviewsStatistics(brandName);

            return statistics;
        }
        [Route("GetProductReviewsStatistics")]
        public ReviewStatistics GetProductReviewsStatistics(int id)
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            var statistics = service.GetProductReviewsStatistics(id);

            return statistics;
        }
    }
}