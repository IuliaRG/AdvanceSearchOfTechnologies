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
        public List<ProductDto> GetBrandProducts(string brandName)
        {
            var allProducts = productDetailsRepository.GetAll();
            var products = allProducts.Where(it => brandName.Equals(it.Brand)).Select(r => new ProductDto { Name = r.Name, Id = r.Id }).ToList();

            return products;
        }
        public ProductPaginingParametersDto GetProductsOnPage(ProductPaginingParametersDto paginationParameters)
        {
            var allProducts = productDetailsRepository.GetAll().AsQueryable();
            var products = allProducts;
           
            if (!string.IsNullOrEmpty(paginationParameters.SortField))
            {
                products = allProducts.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
            }
            //if (!string.IsNullOrEmpty(paginationParameters.SearchText))
            //{
            //    products = allProducts.Filter("Email", paginationParameters.SearchText);
            //    products = (from user in activeUsers.Where(user => user.UserDetails.Address.Contains(paginationParameters.SearchText) || user.UserDetails.FirstName.Contains(paginationParameters.SearchText) || user.UserDetails.LastName.Contains(paginationParameters.SearchText) || user.UserName.Contains(paginationParameters.SearchText) || user.Email.Contains(paginationParameters.SearchText))
            //             select user).AsQueryable();
            //    if (!string.IsNullOrEmpty(paginationParameters.SortField))
            //    {
            //        users = users.OrderBy(paginationParameters.SortField, paginationParameters.SortDirection);
            //    }
            //}
            int totalNrProducts = products.Count();
            int currentPage = paginationParameters.PageNumber;
            int lastPage = (int)Math.Ceiling(totalNrProducts / (double)paginationParameters.ItemsOnPage);
            var productToSend = products.ToProductDetailsDtos().Skip((currentPage - 1) * paginationParameters.ItemsOnPage).Take(paginationParameters.ItemsOnPage).ToList();
            ProductPaginingParametersDto pageDto = new ProductPaginingParametersDto();
            pageDto.MaxPageItems = totalNrProducts;
            pageDto.CurrentPage = currentPage;
            pageDto.LastPage = lastPage;
            pageDto.Data = productToSend;
            pageDto.SearchText = paginationParameters.SearchText;

            return pageDto;
        }
        public object GetAllBrands()
        {
            var allProducts = productDetailsRepository.GetAll();
            var products = allProducts.Where(it => it.Brand != null).Select(r => new { Name= r.Brand, Products=new List<string>()}).Distinct().ToList();
            return products;
        }
    }
}
