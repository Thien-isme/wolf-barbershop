using barbershop.Models.Entitys;

namespace barbershop.Models.ResponseDTOs
{
    public class UserVoucherDTO
    {
        public long UserVoucherId { get; set; }

        public long? UserId { get; set; }

        public int? VoucherId { get; set; }

        public int? Quantity { get; set; }

        public bool? IsActive { get; set; }

        public UserDTO? UserDTO { get; set; }

        public VoucherDTO? VoucherDTO { get; set; }
    }
}
