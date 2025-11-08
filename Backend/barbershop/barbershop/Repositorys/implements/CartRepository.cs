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

        public void BeginTransaction()
        {
            _context.Database.BeginTransaction();
        }
        public void CommitTransaction()
        {
            _context.Database.CommitTransaction();
        }

        public void RollbackTransaction()
        {
            _context.Database.RollbackTransaction();
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
            var existingCart = await _context.Carts.FindAsync(cart.CartId);
            if (existingCart == null)
            {
                return false;
            }
            existingCart.Quantity = cart.Quantity;
            _context.Carts.Update(existingCart);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Cart>?> GetProductInCartsOfUser(string? userId)
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
                .CountAsync();
        }

        public async Task<Cart?> GetCartByCartId(int cartId)
        {
            return await _context.Carts
                .FirstOrDefaultAsync(c => c.CartId == cartId);
        }

        public async Task<bool> DeleteProductInCart(long cartId)
        {
            var cart = await _context.Carts.FindAsync(cartId);
            if (cart == null)
            {
                return false;
            }
            _context.Carts.Remove(cart);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
