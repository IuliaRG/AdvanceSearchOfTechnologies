using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjects.Mapper
{
  public static  class ProductMapper
    {
        public static ProductDetailsDto ToProductDetailsDto(this ProductDetails product)
        {
            var result = new ProductDetailsDto();
            result.Id = product.Id;
            result.Name = product.Name;
            result.Description = product.Description;
            result.ShortDescription = product.ShortDescription;
            result.ReleaseDate = product.ReleaseDate.ToString("MM/dd/yyyy");
            result.Model = product.Model;
            result.Dimensions = product.Dimensions;
            result.Price = product.Price;
            result.Code = product.Code;
            result.Brand = product.Brand;
            result.Category = product.Category;
            result.Image = "Content/" + product.Image;
            result.Reviews = product.UserReview.ToReviewDtos();
            return result;
        }
        public static IEnumerable<ProductDetailsDto> ToProductDetailsDtos(this IEnumerable<ProductDetails> user)
        {
            var result = user.Select(it => new ProductDetailsDto()
            {
                Id = it.Id,
                Name = it.Name,
                Description = it.Description,
                Price = it.Price,
                ShortDescription = it.ShortDescription,
                ReleaseDate = it.ReleaseDate.ToString("MM/dd/yyyy"),
                Model = it.Model,
                Brand = it.Brand,
                Code = it.Code,
                Category = it.Category,
                Dimensions = it.Dimensions,
                Image = "Content/" + it.Image,
                
                Reviews = it.UserReview.ToReviewDtos(),
            });

            return result;
        }

        public static UserReviewDto ToReviewDto(this UserReview review)
        {
            var reviewUser = new UserReviewDto();
            if (review != null)
            {
                reviewUser.Content = review.Content;
                reviewUser.Sentiment = review.Sentiment;
                
            }

            return reviewUser;
        }
        public static ProductDetails FromProductDetailsDto(this ProductDetails entityProductDetails, ProductDetailsDto productDetailsDto)
        {
            entityProductDetails.Name = productDetailsDto.Name;
            entityProductDetails.Code = productDetailsDto.Code;
            entityProductDetails.Category = productDetailsDto.Category;
            entityProductDetails.Description = productDetailsDto.Description;
            entityProductDetails.ShortDescription = productDetailsDto.ShortDescription;
            entityProductDetails.ReleaseDate = DateTime.Parse(productDetailsDto.ReleaseDate);
            entityProductDetails.Model = productDetailsDto.Model;
            entityProductDetails.Dimensions = productDetailsDto.Dimensions;
            entityProductDetails.Price = productDetailsDto.Price;
            entityProductDetails.Brand = productDetailsDto.Brand;
          
            

            return entityProductDetails;
        }
        public static IEnumerable<UserReviewDto> ToReviewDtos(this IEnumerable<UserReview> userReview)
        {
            var result = userReview.Select(it => new UserReviewDto()
            {
                Content = it.Content,
                Sentiment = it.Sentiment,
           //     ProductName = it.ProductDetails_Id,

            });

            return result;
        }

    }
}
