using Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObjects;
using BusinessObjects.Entity;
using BusinessObjects.Mapper;

namespace BuisniessLogic
{
    public class ProductService : IProductService
    {
        IRepository<ProductDetails> productDetailsRepository;
        public ProductService(IRepository<ProductDetails> productDetailsRepository)
        {
            this.productDetailsRepository = productDetailsRepository;
           
        }
        public void AddOrUpdateProduct(ProductDetailsDto product)
        {
            ProductDetails entityProduct=new ProductDetails();
            if (product.Code != null)
            {
                entityProduct = productDetailsRepository.GetAll().FirstOrDefault(it => it.Code == product.Code);
                entityProduct.FromProductDetailsDto(product);
                productDetailsRepository.Update(entityProduct);
            }
            else
            {
                product.Code = Guid.NewGuid().ToString(); ;
              //  entityProduct = productDetailsRepository.GetAll().FirstOrDefault(it => it.TokenGuid == product.TokenGuid);
                entityProduct.FromProductDetailsDto(product);
                productDetailsRepository.Insert(entityProduct);
            }
            productDetailsRepository.Save();
        }
       

        public IEnumerable<ProductDetailsDto> GetAllProducts()
        {
            var productEnitiy = productDetailsRepository.GetAll();
            var result = productEnitiy.ToProductDetailsDtos();

            return result;
        }

        public ProductDetailsDto GetProductById(int id)
        {
            var product = productDetailsRepository.GetById(id).ToProductDetailsDto();

            return product;
        }
    }
}
