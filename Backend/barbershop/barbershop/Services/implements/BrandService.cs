using barbershop.Models.Entitys;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class BrandService
    {
        private readonly BrandRepository _brandRepository;
        private BaseResponse baseResponse = new BaseResponse();

        public BrandService()
        {
            _brandRepository = new BrandRepository();
        }
        public async Task<BaseResponse?> GetAllBrands()
        {
            try
            {
                var brands = await _brandRepository.GetAllBrands();
                if (brands != null && brands.Count > 0)
                {
                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Brands retrieved successfully.";
                    baseResponse.Data = brands;
                }
                else
                {
                    baseResponse.Status = 404;
                    baseResponse.MessageShow = "No brands found.";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "An error occurred while retrieving brands.";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }
    }
}
