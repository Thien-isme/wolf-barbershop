using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Payment
{
    public long PaymentId { get; set; }

    public bool? IsAppointment { get; set; }

    public long? AppointmentId { get; set; }

    public int? PaymentMethodId { get; set; }

    public long CustomerId { get; set; }

    public int? CasherId { get; set; }

    public decimal Subtotal { get; set; }

    public int? VoucherId { get; set; }

    public decimal Total { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? ExpdateDate { get; set; }

    public virtual Appointment? Appointment { get; set; }

    public virtual Employee? Casher { get; set; }

    public virtual User Customer { get; set; } = null!;

    public virtual PaymentsMethod? PaymentMethod { get; set; }

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual Voucher? Voucher { get; set; }
}
