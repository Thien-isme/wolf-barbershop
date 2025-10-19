using barbershop.Repositorys.implements;

namespace barbershop.Services.implements
{
    public class LoyaltyPointService
    {
        private readonly LoyaltyPointRepository _loyaltyPointRepository;

        public LoyaltyPointService()
        {
            _loyaltyPointRepository = new LoyaltyPointRepository();
        }





    }
}
