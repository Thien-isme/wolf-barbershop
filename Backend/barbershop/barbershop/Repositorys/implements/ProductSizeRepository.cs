using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class ProductSizeRepository
    {
        private readonly BarbershopContext _context;
        public ProductSizeRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<ProductSize> Add(ProductSize productSize)
        {
            var productSizeAdded = _context.ProductSizes.Add(productSize);
            await _context.SaveChangesAsync();
            return productSizeAdded.Entity;
        }


    }
}
