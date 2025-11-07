using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class SizeService
    {
        private readonly SizeRepository sizeRepository;
        public SizeService()
        {
            sizeRepository = new SizeRepository();
        }

        public async Task<BaseResponse?> GetAllSizesAsync()
        {
            try
            {
                var sizes = await sizeRepository.GetAllSizes();

                if(sizes != null || sizes.Count > 0)
                {
                    var sizeDTOs = sizes?.Select(size => new SizeDTO
                    {
                        SizeId = size.SizeId,
                        SizeName = size.SizeName,
                        CreatedAt = size.CreatedAt,
                        IsActive = size.IsActive
                    }).ToList();

                    return new BaseResponse
                    {
                        Status = 200,
                        MessageShow = "Lấy danh sách size thành công!",
                        MessageHide = null,
                        Data = sizeDTOs
                    };
                }
                
                return new BaseResponse
                {
                    Status = 200,
                    MessageShow = "Lấy danh sách size thành công!",
                    MessageHide = null,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Status = 500,
                    MessageShow = "Lỗi hệ thống, Vui lòng thử lại sau!",
                    MessageHide = ex.Message,
                    Data = null
                };
            }
        }
    }
}
