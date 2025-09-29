using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
namespace barbershop.Repositorys.implements
{
    public class UserVoucherRepository
    {
        private readonly BarbershopContext _context;
        public UserVoucherRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<UserVoucher?>> GetVouchersOfUser(long userId)
        {
            return await _context.UserVouchers
                .Include(uv => uv.Voucher)
                .Where(uv => uv.UserId == userId && uv.Voucher.Status == "active")
                .ToListAsync();
        }
    }
}
