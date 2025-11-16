using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
namespace barbershop.Repositorys.implements
{
    public class InvoiceRepository
    {
        private readonly BarbershopContext _context;
        public InvoiceRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<bool> CreateInvoiceAsync(Invoice invoiceEntity)
        {
            await _context.Invoices.AddAsync(invoiceEntity);
            bool saveSuccess = await _context.SaveChangesAsync() > 0;
            return saveSuccess;
        }



        public async Task<int?> GetTotalCustomerFromToAsync(int? brandId, DateTime from, DateTime to)
        {
            var totalCustomer = await _context.Invoices
                .Where(i => i.BranchId == brandId
                    && i.CreatedAt >= from
                    && i.CreatedAt <= to)
                .Select(i => i.InvoiceId)
                .Distinct()
                .CountAsync();
            return totalCustomer;
        }

        public async Task<BestBarberDTO?> GetBestBarberInWeekAsync(int? brandId, DateTime from, DateTime to)
        {
            var bestBarber = await _context.Invoices
                .Where(i => i.BranchId == brandId
                    && i.CreatedAt >= from
                    && i.CreatedAt <= to
                    && i.BarberId != null)
                .GroupBy(i => i.BarberId)
                .Select(g => new BestBarberDTO
                {
                    BarberId = g.Key,
                    TotalSlot= g.Count()
                })
                .OrderByDescending(g => g.TotalSlot)
                .Select(g => new BestBarberDTO
                {
                    BarberId = g.BarberId,
                    TotalSlot = g.TotalSlot
                })
                .FirstOrDefaultAsync();

             return bestBarber;
        }

        public async Task<Object?> GetRevenueInWeekChartDataAsync(int? brandId, DateOnly fromDateOnly, DateOnly toDateOnly)
        {
            var revenueData = await _context.Invoices
                .Where(i => i.BranchId == brandId
                    && i.CreatedAt.HasValue
                    && i.CreatedAt.Value.Date >= fromDateOnly.ToDateTime(new TimeOnly(0, 0))
                    && i.CreatedAt.Value.Date <= toDateOnly.ToDateTime(new TimeOnly(23, 59)))
                .GroupBy(i => i.CreatedAt.Value.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    TotalRevenue = g.Sum(i => i.Total)
                })
                .OrderBy(g => g.Date)
                .ToListAsync();

            return revenueData;
        }



        // TODO: Implement repository methods for Payment
    }
}
