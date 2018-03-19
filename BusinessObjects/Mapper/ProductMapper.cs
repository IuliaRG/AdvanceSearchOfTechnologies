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
            result.ReleaseDate = product.ReleaseDate;
            result.Model = product.Model;
            result.Dimensions = product.Dimensions;
            result.Price = product.Price;
            result.Code = product.Code;
            result.Brand = product.Brand;
            result.Image = product.Image;
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
                ReleaseDate = it.ReleaseDate,
                Model = it.Model,
                Dimensions = it.Dimensions,
                Image = it.Image,
            });

            return result;
        }
        public static ProductDetails FromProductDetailsDto(this ProductDetails entityProductDetails, ProductDetailsDto productDetailsDto)
        {
            entityProductDetails.Name = productDetailsDto.Name;
            entityProductDetails.Code = productDetailsDto.Code;
            entityProductDetails.Description = productDetailsDto.Description;
            entityProductDetails.ShortDescription = productDetailsDto.ShortDescription;
            entityProductDetails.ReleaseDate = productDetailsDto.ReleaseDate;
            entityProductDetails.Model = productDetailsDto.Model;
            entityProductDetails.Dimensions = productDetailsDto.Dimensions;
            entityProductDetails.Price = productDetailsDto.Price;
            entityProductDetails.Brand = productDetailsDto.Brand;
            entityProductDetails.Image = productDetailsDto.Image;


            return entityProductDetails;
        }
    }
}
