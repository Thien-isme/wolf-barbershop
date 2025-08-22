using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class ProductService
    {
        readonly ProductRepository productRepository;
        public ProductService()
        {
            productRepository = new ProductRepository();
        }

        public async Task<List<ProductDTO>> GetAllProductsAsync()
        {
            var products = await productRepository.GetAllProductsAsync();

            var productDTOs = products.Select(p => new ProductDTO
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                ProductTypeId = p.ProductTypeId,
                Price = p.Price,
                Discount = p.Discount,
                Instruction = p.Instruction,
                isActive = p.IsActive,
                ProductTypeName = p.ProductType.ProductTypeName
            }).ToList();


            return productDTOs;
        }

        

    }
}
