using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public int? BranchId { get; set; }

    public int? ExperienceYears { get; set; }

    public decimal? Rating { get; set; }

    public int? QuantityRate { get; set; }

    public bool IsActive { get; set; }

    public string? AvatarUrl { get; set; }

    public long? UserId { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual Branch? Branch { get; set; }

    public virtual ICollection<EmployeeImgHair> EmployeeImgHairs { get; set; } = new List<EmployeeImgHair>();

    public virtual ICollection<EmployeeSkill> EmployeeSkills { get; set; } = new List<EmployeeSkill>();

    public virtual ICollection<Invoice> InvoiceBarbers { get; set; } = new List<Invoice>();

    public virtual ICollection<Invoice> InvoiceCashiers { get; set; } = new List<Invoice>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual User? User { get; set; }
}
