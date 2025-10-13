using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class CartRepository
    {
        private readonly BarbershopContext _context;

        public CartRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<bool> Save(Cart cart)
        {
            _context.Carts.Add(cart);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Cart?> GetCartByUserIdAndProductId(string? userId, int productId)
        {
            return await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId.ToString() == userId && c.ProductId == productId);
        }

        public async Task<bool> UpdateQuantity(Cart cart)
        {
            _context.Carts.Update(cart);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Cart>?> GetCartsByUserId(string? userId)
        { 
            return await _context.Carts
                .Include(c => c.Product)
                    .ThenInclude(p => p.ProductPrices)
                .Include(c => c.Size)
                .Where(c => c.UserId.ToString() == userId)
                .ToListAsync();
        }

        public async Task<int?> CountProductsInCartByUserId(string? userId)
        {
            return await _context.Carts
                .Where(c => c.UserId.ToString() == userId)
                .SumAsync(c => c.Quantity);
        }
    }
}
