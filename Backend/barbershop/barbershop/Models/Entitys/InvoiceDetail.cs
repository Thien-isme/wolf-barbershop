using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class InvoiceDetail
{
    public long InvoiceDetailId { get; set; }

    public long? InvoiceId { get; set; }

    public int? ServiceId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Price { get; set; }

    public int? SizeId { get; set; }

    public virtual Invoice? Invoice { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Service? Service { get; set; }

    public virtual Size? Size { get; set; }
}
