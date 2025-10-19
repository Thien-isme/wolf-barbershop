using barbershop.Models.Entitys;
using Microsoft.EntityFrameworkCore;
namespace barbershop.Repositorys.implements
{
    public class LoyaltyPointRepository
    {
        private readonly BarbershopContext _dbContext;
        public LoyaltyPointRepository()
        {
            _dbContext = new BarbershopContext();
        }

        public async Task<bool> PlusLoyaltyPoints(long userId, int pointEarned)
        {
            var loyaltyPoint = await _dbContext.LoyaltyPoints
                .FirstOrDefaultAsync(lp => lp.UserId == userId);
            if (loyaltyPoint != null)
            {
                loyaltyPoint.TotalPoints += pointEarned;
                _dbContext.LoyaltyPoints.Update(loyaltyPoint);
            }
            else
            {
                loyaltyPoint = new LoyaltyPoint
                {
                    UserId = userId,
                    TotalPoints = pointEarned
                };
                await _dbContext.LoyaltyPoints.AddAsync(loyaltyPoint);
            }
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }
    }
}
