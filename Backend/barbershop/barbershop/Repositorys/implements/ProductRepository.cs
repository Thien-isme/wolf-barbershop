using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class ProductRepository
    {
        private readonly BarbershopContext _context;

        public ProductRepository()
        {
            _context = new BarbershopContext();
        }

        //using Admin Manager
        public async Task<List<Product>> GetAllProductsToManagementAsync()
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductPrices)
                .Where(p => p.ProductPrices.Any(pp => pp.IsActive == true))
                .ToListAsync();
        }

        public async Task<List<Product>> GetAllProductsForSaleAsync()
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.Brand)
                .Include(p => p.ProductSizes).ThenInclude(ps => ps.Inventories)
                .Include(p => p.ProductSizes).ThenInclude(ps => ps.Size)
                .Include(p => p.ProductPrices)
                .Where(p => p.IsActive == true)
                .ToListAsync();

        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .FirstAsync(p => p.ProductId == id);
        }

        public async Task<List<Product>> GetAllProductsIsOutStandingAsync()
        {
            return await _context.Products
                .Include(p => p.ProductPrices)
                .Where(p => p.IsOutstanding == true && p.IsActive == true)
                .ToListAsync();
        }
    }
}
