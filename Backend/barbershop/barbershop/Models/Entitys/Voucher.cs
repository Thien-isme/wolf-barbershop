using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Voucher
{
    public int VoucherId { get; set; }

    public string VoucherName { get; set; } = null!;

    public string VoucherCode { get; set; } = null!;

    public string DiscountType { get; set; } = null!;

    public decimal DiscountValue { get; set; }

    public int Quantity { get; set; }

    public string? Description { get; set; }

    public DateTime? Startdate { get; set; }

    public DateTime? Expdate { get; set; }

    public string? VoucherUrl { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
