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
        void AddOrUpdateProduct(ProductDetailsDto product);
        ProductDetailsDto GetProductById(int id);
        object GetAllBrands();
        List<ProductDto> GetBrandProducts(string brandName);
        IEnumerable<MeniuModelDto> GetBrandsByCategory();
        ProductPaginingParametersDto GetProductsOnPage(ProductPaginingParametersDto paginationParameters);
    }
}
