using System;

namespace barbershop.Models.ResponseDTOs
{
    public class ReviewDTO
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int EmployeeId { get; set; }
        public int ServiceId { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}
