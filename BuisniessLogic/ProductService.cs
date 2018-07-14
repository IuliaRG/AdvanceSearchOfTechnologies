using Abstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessObjects;
using BusinessObjects.Entity;
using BusinessObjects.Mapper;
using BusinessObjects.Dto;

namespace BuisniessLogic
{
    public class ProductService : IProductService
    {
        IRepository<ProductDetails> productDetailsRepository;
        public ProductService(IRepository<ProductDetails> productDetailsRepository)
        {
            this.productDetailsRepository = productDetailsRepository;
           
        }
        public int AddOrUpdateProduct(ProductDetailsDto product)
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
                entityProduct.FromProductDetailsDto(product);
                productDetailsRepository.Insert(entityProduct);
            }
            productDetailsRepository.Save();
           return  entityProduct.Id;
        }
       

        public IEnumerable<ProductDetailsDto> GetAllProducts()
        {
            var productEnitiy = productDetailsRepository.GetAll();
            var result = productEnitiy.ToProductDetailsDtos();

            return result;
        }
        public IEnumerable<ProductDetailsDto> GetPopularProducts()
        {
            var productEnitiy = productDetailsRepository.GetAll().Where(it => it.Code != "" &&  it.Category != null).OrderByDescending(it => it.UserReview.Count()).Take(4);
            var result = productEnitiy.ToProductDetailsDtos().ToList();
         
            return result;
        }

        public ProductDetailsDto GetProductById(int id)
        {
            var product = productDetailsRepository.GetById(id).ToProductDetailsDto();

            return product;
        }
        public void UpdatePhoto(int id, string name)
        {
            
            ProductDetails entityProduct = new ProductDetails();
            entityProduct = productDetailsRepository.GetAll().FirstOrDefault(it => it.Id == id);
            entityProduct.Image= name;
            productDetailsRepository.Update(entityProduct);
            productDetailsRepository.Save();
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
            var products = allProducts.Where(it => it.Code != "" && it.Category != null);
            if (!string.IsNullOrEmpty(paginationParameters.Category))
            {
                products = allProducts.Where(it => it.Category.Equals(paginationParameters.Category ) );
            }
            if (!string.IsNullOrEmpty(paginationParameters.Brand))
            {
                products = products.Where(it => it.Brand.Equals(paginationParameters.Brand));
            }
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
            pageDto.Meniu =GetBrandsByCategory() ;
            return pageDto;
        }
        public IEnumerable<MeniuModelDto> GetBrandsByCategory()
        {
            var allProducts = productDetailsRepository.GetAll();

            var results = from p in allProducts
                          where p.Brand != null &&  p.Category!=null
                          group p.Brand
                          by p.Category into g
                          select new MeniuModelDto()
                          { Category = g.Key, Brands = g.Distinct()
        };
            return results;
        }
        public object GetAllBrands()
        {
            var allProducts = productDetailsRepository.GetAll();

            var products = allProducts.Where(it => it.Brand != null &&  it.Category != null).Select(r => new { Name= r.Brand}).Distinct().ToList();
            return products;
        }

        public List<ProductDto> GetBrandsByCategory(string category)
        {
            throw new NotImplementedException();
        }

       
    }}
