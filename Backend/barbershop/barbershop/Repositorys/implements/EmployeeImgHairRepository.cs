using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Repositorys.implements
{
    public class EmployeeImgHairRepository
    {
        private readonly BarbershopContext _context;
        public EmployeeImgHairRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<EmployeeImgHair>?> GetAllByEmployeeId(int employeeId)
        {
            return await _context.EmployeeImgHairs
                .Where(eih => eih.EmployeeId == employeeId && eih.IsActive == true)
                .OrderByDescending(eih => eih.EmployeeImgHairId)
                .ToListAsync();
        }

        public async Task<List<EmployeeImgHair>?> GetHairIsOutstanding()
        {
            return await _context.EmployeeImgHairs
                .Where(eih => eih.IsOutstanding == true && eih.IsActive == true)
                .OrderByDescending(eih => eih.EmployeeImgHairId)
                .ToListAsync();
        }
        // TODO: Implement repository methods for EmployeeImgHair
    }
}
