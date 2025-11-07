using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
namespace barbershop.Repositorys.implements
{
    public class SizeRepository
    {
        private readonly BarbershopContext _context;
        public SizeRepository()
        {
            _context = new BarbershopContext();
        }
        public async Task<List<Size>?> GetAllSizes()
        {
            return await _context.Sizes
                .ToListAsync();
        }
    }
}
