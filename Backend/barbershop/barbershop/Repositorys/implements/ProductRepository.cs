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

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Where(p => p.IsActive == true)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .FirstAsync(p => p.ProductId == id);
        }

    }
}
