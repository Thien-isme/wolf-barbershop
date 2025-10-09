using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
namespace barbershop.Repositorys.implements
{
    public class PaymentsMethodRepository
    {
        private readonly BarbershopContext _context;
        public PaymentsMethodRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<List<PaymentsMethod>> GetPaymentsMethods()
        {
            return await _context.PaymentsMethods
                .Where(pm => pm.IsActive)
                .ToListAsync();
        }
        // TODO: Implement repository methods for PaymentsMethod
    }
}
