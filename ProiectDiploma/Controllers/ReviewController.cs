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
        public IHttpActionResult AddOrUpdate(UserReviewDto user)
        {
            user.ApplicationUserId = RequestContext.Principal.Identity.GetUserId();
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            service.AddOrUpdateReview(user);
            return Ok();
        }
        [Route("GetAllReviews")]
        public IEnumerable<UserReviewDto> GetAll()
        {
            service = DIContainerST.GetInstance().Resolve<IReviewService>();
            var user = service.GetAllReviews();
       
            return user;
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
            var user = service.GetReviewsByUserId(id);

            return user;
        }
    }
}