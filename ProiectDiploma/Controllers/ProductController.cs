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
            var product = service.GetProductById(id);
            return product;
        }
    }
}