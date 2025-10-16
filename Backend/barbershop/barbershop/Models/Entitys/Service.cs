using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Service
{
    public int ServiceId { get; set; }

    public string ServiceName { get; set; } = null!;

    public int ServiceTypeId { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int DurationMin { get; set; }

    public bool IsActive { get; set; }

    public string? ServiceImage { get; set; }

    public bool? IsOutstanding { get; set; }

    public virtual ICollection<AppointmentService> AppointmentServices { get; set; } = new List<AppointmentService>();

    public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual ServiceType ServiceType { get; set; } = null!;
}
