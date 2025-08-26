using System;

namespace barbershop.Models.ResponseDTOs
{
    public class VoucherDTO
    {
        public int VoucherId { get; set; }
        public string VoucherCode { get; set; }
        public decimal DiscountAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; }
    }
}
