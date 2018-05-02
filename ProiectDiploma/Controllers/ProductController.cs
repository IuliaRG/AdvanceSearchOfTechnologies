using Abstracts;
using BusinessObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ProiectDiploma.Controllers
{
    [RoutePrefix("api/Product")]
    public class ProductController : ApiController
    {
        private IProductService service;
        private IReviewService review;
        [Route("GetAllProducts")]
        public IEnumerable<ProductDetailsDto> GetAll()
        {
            service = DIContainerST.GetInstance().Resolve<IProductService>();
            var products = service.GetAllProducts();
            return products;
        }
        [Route("AddOrUpdateProduct")]
        public IHttpActionResult AddOrUpdateProduct(ProductDetailsDto product)
        {
            service = DIContainerST.GetInstance().Resolve<IProductService>();
            service.AddOrUpdateProduct(product);
            return Ok();
        }
        [Route("GetProductByID")]
        public ProductDetailsDto GetProductByID(int id)
        {
            service = DIContainerST.GetInstance().Resolve<IProductService>();
           // review= DIContainerST.GetInstance().Resolve<IReviewService>();
            var product = service.GetProductById(id);
           // var productreview= review.GetReviewsByProductCode(product.Code);
          //  product.Reviews = productreview;
            return product;
        }
        [Route("GetAllBrands")]
        public List<string> GetAllBrands()
        {
            service = DIContainerST.GetInstance().Resolve<IProductService>();
            var brands = service.GetAllBrands();

            return brands;
        }
        [Route("GetBrandProducts")]
        public List<string> GetBrandProducts(string brandName)
        {
            service = DIContainerST.GetInstance().Resolve<IProductService>();
            var products = service.GetBrandProducts(brandName);

            return products;
        }
    }
}
