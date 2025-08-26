using barbershop.Models.Entitys;

namespace barbershop.Services.implements
{
    using barbershop.Models.ResponseDTOs;
    using barbershop.Repositorys.implements;

    public class ReviewService
    {
        private ReviewRepository  reviewRepository;
        private BaseResponse baseResponse = new BaseResponse();
        public ReviewService()
        {
            reviewRepository = new ReviewRepository();
        }
        // TODO: Implement service methods for Review
    }
}
