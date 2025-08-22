using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class AppointmentService
{
    public long AppointmentServiceId { get; set; }

    public long AppointmentId { get; set; }

    public int ServiceId { get; set; }

    public virtual Appointment Appointment { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;
}
