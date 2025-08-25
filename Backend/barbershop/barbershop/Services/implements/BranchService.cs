using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;
using Microsoft.AspNetCore.Http;

namespace barbershop.Services.implements
{
    public class BranchService
    {
        private readonly BranchRepository branchRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public BranchService()
        {
            branchRepository = new BranchRepository();
        }

        public async Task<BaseResponse?> AddBranchAsync(BranchRequets request, IFormFile? BranchImage)
        {
            try
            {
                string? imageUrl = null;
                if (BranchImage != null)
                {
                    // Upload ảnh lên Cloudinary
                    imageUrl = await CloudinaryHelper.UploadImageAsync(BranchImage);
                }

                var newBranch = new Branch
                {
                    BranchName = request.BranchName,
                    ProvinceCity = request.ProvinceCity,
                    WardCommune = request.WardCommune,
                    LocationDetail = request.LocationDetail,
                    BranchUrl = imageUrl,
                    TimeOn = request.TimeOn,
                    TimeOff = request.TimeOff,
                    IsActive = true
                };

                var branch = await branchRepository.AddBranchAsync(newBranch);

                if (branch != null)
                {
                    baseResponse.Status = StatusCodes.Status200OK;
                    baseResponse.MessageShow = "Thành công";
                    baseResponse.Data = branch;
                }
            }
            catch (Exception ex)
            {
                baseResponse.Status = StatusCodes.Status500InternalServerError;
                baseResponse.MessageHide = "Lỗi hệ thống: " + ex.Message;
                baseResponse.Data = null;
            }
            return baseResponse;
        }
    }
}
