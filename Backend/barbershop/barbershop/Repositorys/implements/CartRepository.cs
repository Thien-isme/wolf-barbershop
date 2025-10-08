using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class CartRepository
    {
        private readonly BarbershopContext _context;

        public CartRepository()
        {
            _context = new BarbershopContext();
        }

        public bool Save(Cart cart)
        {
            //_context.Carts.Add(cart);
            return _context.SaveChanges() > 0;
        }
    }
}
