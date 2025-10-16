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
    }
}
