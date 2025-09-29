using System;
using System.Collections.Generic;

namespace barbershop.Models.Entitys;

public partial class User
{
    public long UserId { get; set; }

    public string? Email { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string FullName { get; set; } = null!;

    public string? Phone { get; set; }

    public DateOnly? Dob { get; set; }

    public string? Address { get; set; }

    public string? Cccd { get; set; }

    public int RoleId { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; }

    public string? AvatarUrl { get; set; }

    public virtual ICollection<AccessToken> AccessTokens { get; set; } = new List<AccessToken>();

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<UserVoucher> UserVouchers { get; set; } = new List<UserVoucher>();
}
