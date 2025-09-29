using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class UserVoucher
{
    public long UserVoucherId { get; set; }

    public long? UserId { get; set; }

    public int? VoucherId { get; set; }

    public int? Quantity { get; set; }

    public virtual User? User { get; set; }

    public virtual Voucher? Voucher { get; set; }
}
