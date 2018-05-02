using BusinessObjects;
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
        void AddOrUpdateProduct(ProductDetailsDto product);
        ProductDetailsDto GetProductById(int id);
        List<string> GetAllBrands();
        List<string> GetBrandProducts(string brandName);
    }
}
