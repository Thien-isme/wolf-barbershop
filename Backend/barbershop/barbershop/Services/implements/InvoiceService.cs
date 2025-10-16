using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class InvoiceService
    {
        private readonly InvoiceRepository _invoiceRepository;
        public InvoiceService()
        {
            _invoiceRepository = new InvoiceRepository();
        }

        public Task<BaseResponse?> CreateInvoice(CreateInvoiceRequest invoice)
        {
            return null;
        }
    }
}
