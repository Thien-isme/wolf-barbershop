using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class ProductPriceRepository
    {
        private readonly BarbershopContext _context;
        public ProductPriceRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<ProductPrice> Add(ProductPrice productPrice)
        {
            var productPriceAdded = _context.ProductPrices.Add(productPrice);
            await _context.SaveChangesAsync();
            return productPriceAdded.Entity;
        }
    }
}
