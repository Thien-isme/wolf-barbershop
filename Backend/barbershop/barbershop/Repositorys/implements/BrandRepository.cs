using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class BrandRepository
    {
        private readonly BarbershopContext _context;
        public BrandRepository()
        {
            _context = new BarbershopContext();
        }
        public async Task<List<Brand>?> GetAllBrands()
        {
            return await _context.Brands.ToListAsync();
        }
    }
}
