using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class PaymentService
{
    public long PaymentServiceId { get; set; }

    public long PaymentId { get; set; }

    public int ServiceId { get; set; }

    public int BarberId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Employee Barber { get; set; } = null!;

    public virtual Invoice Payment { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;
}
