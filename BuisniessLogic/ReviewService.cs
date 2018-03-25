using Abstracts;
using BusinessObjects;
using BusinessObjects.Dto;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BuisniessLogic
{
  public  class ReviewService : IReviewService
    {
        IRepository<UserReview> userReviewRepository;
        IRepository<ApplicationUser> userRepository;
        private const string apiKey = "40950a4c555"; // api key
        private const string sentimentUri = "https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
        private  WebClient client;
        IConfigurationService configurationService;
        public ReviewService(IConfigurationService configurationService, IRepository<UserReview> userReviewRepository, IRepository<ApplicationUser>  userRepository, WebClient client)
        {
            this.configurationService = configurationService;
            this.userReviewRepository = userReviewRepository;
            this.userRepository = userRepository;
            this.client = client;
            var apiConfiguration = configurationService.GetConfiguration().TextAnalyticsConfiguration;
            client.Headers.Add("Ocp-Apim-Subscription-Key", apiConfiguration.ApiKey);
        }
        public void AddOrUpdateReview(UserReviewDto user)
        {
            var entity = new UserReview();
            var document = user.ToTextAnalyticsDocuments();
            user.TextAnalyticRespons = GetTextAnalyticsSentiment(document);
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

            return reviews;
        }
        public TextAnalyticResponsDto GetTextAnalyticsSentiment(TextAnalyticsDto documentDto)
        {
            var sentimentResponse = client.UploadString(sentimentUri, JsonConvert.SerializeObject(documentDto));
           var sentiment=JsonConvert.DeserializeObject<TextAnalyticResponsDto>(sentimentResponse);
            return sentiment;
        }
        public void DeleteReview(object id)
        {
            throw new NotImplementedException();
        }
        
    }
}
