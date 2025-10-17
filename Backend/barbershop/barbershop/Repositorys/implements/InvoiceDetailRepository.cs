using barbershop.Models.Entitys;

namespace barbershop.Repositorys.implements
{
    public class InvoiceDetailRepository
    {
        private readonly BarbershopContext _context;
        public InvoiceDetailRepository()
        {
            _context = new BarbershopContext();
        }

        public async Task<bool> CreateInvoiceDetailAsync(InvoiceDetail invoiceDetail)
        {
            await _context.InvoiceDetails.AddAsync(invoiceDetail);
            bool saveSuccess = await _context.SaveChangesAsync() > 0;
            return saveSuccess;
        }
    }
}
