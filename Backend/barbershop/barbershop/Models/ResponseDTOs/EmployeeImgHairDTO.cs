using System;

namespace barbershop.Models.ResponseDTOs
{
    public class EmployeeImgHairDTO
    {
        public int EmployeeImgHairId { get; set; }
        public int EmployeeId { get; set; }
        public string ImageUrl { get; set; }
    }
}
