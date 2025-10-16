using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Voucher
{
    public int VoucherId { get; set; }

    public string VoucherName { get; set; } = null!;

    public string VoucherCode { get; set; } = null!;

    public string DiscountType { get; set; } = null!;

    public decimal? DiscountValue { get; set; }

    public string? Description { get; set; }

    public DateTime? Startdate { get; set; }

    public DateTime? Expdate { get; set; }

    public bool? IsActive { get; set; }

    public decimal? MaxDiscount { get; set; }

    public decimal? MinOrderValue { get; set; }

    public int? UsageLimit { get; set; }

    public int? UsedCount { get; set; }

    public string Status { get; set; } = null!;

    public string? VoucherImg { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
