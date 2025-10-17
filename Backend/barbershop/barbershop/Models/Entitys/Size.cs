using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Size
{
    public int SizeId { get; set; }

    public string? SizeName { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<BranchesProduct> BranchesProducts { get; set; } = new List<BranchesProduct>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();

    public virtual ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();
}
