using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class ProductTypeRepository
    {
        private readonly BarbershopContext _context;
        public ProductTypeRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<ProductType>?> GetAllTypes()
        {
            return await _context.ProductTypes.ToListAsync();
        }
        // TODO: Implement repository methods for ProductType
    }
}
