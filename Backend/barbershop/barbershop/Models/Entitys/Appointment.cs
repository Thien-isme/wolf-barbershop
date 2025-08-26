using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Appointment
{
    public long AppointmentId { get; set; }

    public int UserId { get; set; }

    public int BarberId { get; set; }

    public int BranchId { get; set; }

    public DateOnly? AppointmentDate { get; set; }

    public TimeOnly? AppointmentTime { get; set; }

    public string Status { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string? Note { get; set; }

    public virtual ICollection<AppointmentService> AppointmentServices { get; set; } = new List<AppointmentService>();

    public virtual Employee Barber { get; set; } = null!;

    public virtual Branch Branch { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual User User { get; set; } = null!;
}
