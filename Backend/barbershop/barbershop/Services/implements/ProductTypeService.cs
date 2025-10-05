using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;
    using System;

    public class ProductTypeService
    {
        private ProductTypeRepository productTypeRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ProductTypeService()
        {
            productTypeRepository = new ProductTypeRepository();
        }

        public async Task<BaseResponse?> GetAllProductType()
        {
            try
            {
                var types = await productTypeRepository.GetAllProductType();
                if (types != null)
                {
                    baseResponse.Status = 200;
                    baseResponse.MessageShow = "Lấy danh sách loại sản phẩm thành công!";
                    baseResponse.MessageHide = "Lấy danh sách loại sản phẩm thành công!";
                    baseResponse.Data = types;
                }
                else
                {
                    baseResponse.Status = 204;
                    baseResponse.MessageShow = "Không có loại sản phẩm nào!";
                    baseResponse.MessageHide = "Không có loại sản phẩm nào!";
                    baseResponse.Data = null;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = 500;
                baseResponse.MessageShow = "Hệ thống có lỗi, Vui lòng thử lại trong giây lát!";
                baseResponse.MessageHide = ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }
        // TODO: Implement service methods for ProductType
    }
}
