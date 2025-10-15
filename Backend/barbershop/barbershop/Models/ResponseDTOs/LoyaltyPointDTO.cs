using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class LoyaltyPointDTO
    {
        public int LoyaltyPointsId { get; set; }

        public long UserId { get; set; }

        public int? TotalPoints { get; set; }

        public DateTime? LastUpdated { get; set; }

        public  UserDTO UserDTO { get; set; } = null!;
    }
}
