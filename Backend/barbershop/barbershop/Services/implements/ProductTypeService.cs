using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class ProductTypeService
    {
        private ProductTypeRepository productTypeRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ProductTypeService()
        {
            productTypeRepository = new ProductTypeRepository();
        }
        // TODO: Implement service methods for ProductType
    }
}
