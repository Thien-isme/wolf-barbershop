using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public int? UserId { get; set; }

    public int? BranchId { get; set; }

    public DateOnly ExperienceYears { get; set; }

    public decimal? Rating { get; set; }

    public int? QuantityRate { get; set; }

    public bool IsActive { get; set; }

    public string? AvatarUrl { get; set; }

    public int? EmployeeRoleId { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual Branch? Branch { get; set; }

    public virtual ICollection<EmployeeImgHair> EmployeeImgHairs { get; set; } = new List<EmployeeImgHair>();

    public virtual EmployeeRole? EmployeeRole { get; set; }

    public virtual ICollection<EmployeeSkill> EmployeeSkills { get; set; } = new List<EmployeeSkill>();

    public virtual ICollection<PaymentService> PaymentServices { get; set; } = new List<PaymentService>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }
}
