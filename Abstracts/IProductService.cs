using BusinessObjects;
using BusinessObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracts
{
  public  interface IProductService
    {
        IEnumerable<ProductDetailsDto> GetAllProducts();
        IEnumerable<ProductDetailsDto> GetPopularProducts();
        int AddOrUpdateProduct(ProductDetailsDto product);
        ProductDetailsDto GetProductById(int id);
        object GetAllBrands();
        List<ProductDto> GetBrandProducts(string brandName);
        IEnumerable<MeniuModelDto> GetBrandsByCategory();
         void UpdatePhoto(int id, string name);
        ProductPaginingParametersDto GetProductsOnPage(ProductPaginingParametersDto paginationParameters);
    }
}
