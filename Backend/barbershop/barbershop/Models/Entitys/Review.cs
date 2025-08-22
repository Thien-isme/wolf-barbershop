using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Review
{
    public long ReviewId { get; set; }

    public long AppointmentId { get; set; }

    public int Rate { get; set; }

    public string? Comment { get; set; }

    public DateTime? CreateAt { get; set; }

    public string? ImgUrl { get; set; }

    public bool? IsActive { get; set; }

    public virtual Appointment Appointment { get; set; } = null!;
}
