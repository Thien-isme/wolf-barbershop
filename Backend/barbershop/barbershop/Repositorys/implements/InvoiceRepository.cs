using barbershop.Models.Entitys;

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

        
        // TODO: Implement repository methods for Payment
    }
}
