using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace barbershop.Models.Entitys;

public partial class BarbershopContext : DbContext
{
    public BarbershopContext()
    {
    }

    public BarbershopContext(DbContextOptions<BarbershopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AccessToken> AccessTokens { get; set; }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AppointmentService> AppointmentServices { get; set; }

    public virtual DbSet<Branch> Branchs { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeImgHair> EmployeeImgHairs { get; set; }

    public virtual DbSet<EmployeeSkill> EmployeeSkills { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentService> PaymentServices { get; set; }

    public virtual DbSet<PaymentsMethod> PaymentsMethods { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceType> ServiceTypes { get; set; }

    public virtual DbSet<Skill> Skills { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Voucher> Vouchers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);Database=barbershop;uid=sa;pwd=12345;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AccessToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__access_t__3213E83F95C3ECF5");

            entity.ToTable("access_tokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AccessToken1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("access_token");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.RevokedAt)
                .HasColumnType("datetime")
                .HasColumnName("revoked_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.AccessTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__access_to__user___30C33EC3");
        });

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.ToTable("appointments");

            entity.HasIndex(e => e.BarberId, "IX_appointments_barber_id");

            entity.HasIndex(e => e.BranchId, "IX_appointments_branch_id");

            entity.HasIndex(e => e.UserId, "IX_appointments_user_id");

            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.AppointmentDate).HasColumnName("appointment_date");
            entity.Property(e => e.AppointmentTime)
                .HasPrecision(0)
                .HasColumnName("appointment_time");
            entity.Property(e => e.BarberId).HasColumnName("barber_id");
            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasColumnName("created_at");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Note).HasColumnName("note");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Barber).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.BarberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_barber_id");

            entity.HasOne(d => d.Branch).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.BranchId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_location_id");

            entity.HasOne(d => d.User).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointments_user_id");
        });

        modelBuilder.Entity<AppointmentService>(entity =>
        {
            entity.ToTable("appointment_service");

            entity.HasIndex(e => e.AppointmentId, "IX_appointment_service_appointment_id");

            entity.HasIndex(e => e.ServiceId, "IX_appointment_service_service_id");

            entity.Property(e => e.AppointmentServiceId).HasColumnName("appointment_service_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Appointment).WithMany(p => p.AppointmentServices)
                .HasForeignKey(d => d.AppointmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointment_service_appointment_id");

            entity.HasOne(d => d.Service).WithMany(p => p.AppointmentServices)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_appointment_service_service_id");
        });

        modelBuilder.Entity<Branch>(entity =>
        {
            entity.HasKey(e => e.BranchId).HasName("PK_locations");

            entity.ToTable("branchs");

            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.BranchName)
                .HasMaxLength(255)
                .HasColumnName("branch_name");
            entity.Property(e => e.BranchUrl)
                .HasMaxLength(255)
                .HasColumnName("branch_url");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.LocationDetail)
                .HasMaxLength(255)
                .HasColumnName("location_detail");
            entity.Property(e => e.ProvinceCity)
                .HasMaxLength(255)
                .HasColumnName("province_city");
            entity.Property(e => e.TimeOff).HasColumnName("time_off");
            entity.Property(e => e.TimeOn).HasColumnName("time_on");
            entity.Property(e => e.WardCommune)
                .HasMaxLength(255)
                .HasColumnName("ward_commune");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.ToTable("employees");

            entity.HasIndex(e => e.BranchId, "IX_employees_branch_id");

            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .HasColumnName("avatar_url");
            entity.Property(e => e.BranchId).HasColumnName("branch_id");
            entity.Property(e => e.ExperienceYears).HasColumnName("experience_years");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.QuantityRate)
                .HasDefaultValue(0)
                .HasColumnName("quantity_rate");
            entity.Property(e => e.Rating)
                .HasDefaultValue(0.0m)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("rating");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Branch).WithMany(p => p.Employees)
                .HasForeignKey(d => d.BranchId)
                .HasConstraintName("FK_employees_location_id");

            entity.HasOne(d => d.User).WithMany(p => p.Employees)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Employee_User");
        });

        modelBuilder.Entity<EmployeeImgHair>(entity =>
        {
            entity.HasKey(e => e.EmployeeImgHairId).HasName("employee_img_hair_employee_img_hair_id_primary");

            entity.ToTable("employee_img_hair");

            entity.HasIndex(e => e.EmployeeId, "IX_employee_img_hair_employee_id");

            entity.Property(e => e.EmployeeImgHairId)
                .ValueGeneratedNever()
                .HasColumnName("employee_img_hair_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("('1')")
                .HasColumnName("is_active");
            entity.Property(e => e.IsOutstanding)
                .HasDefaultValue(false)
                .HasColumnName("is_outstanding");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeImgHairs)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("employee_img_hair_img_url_foreign");
        });

        modelBuilder.Entity<EmployeeSkill>(entity =>
        {
            entity.ToTable("employee_skill");

            entity.HasIndex(e => e.EmployeeId, "IX_employee_skill_employee_id");

            entity.HasIndex(e => e.SkillId, "IX_employee_skill_skill_id");

            entity.Property(e => e.EmployeeSkillId).HasColumnName("employee_skill_id");
            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.SkillId).HasColumnName("skill_id");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeSkills)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_employee_skill_employee_id");

            entity.HasOne(d => d.Skill).WithMany(p => p.EmployeeSkills)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_employee_skill_skill_id");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.ToTable("inventory");

            entity.HasIndex(e => e.ProductId, "IX_inventory_product_id");

            entity.Property(e => e.InventoryId).HasColumnName("inventory_id");
            entity.Property(e => e.LastUpdated)
                .HasPrecision(0)
                .HasColumnName("last_updated");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Product).WithMany(p => p.Inventories)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inventory_product_id");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("payments");

            entity.HasIndex(e => e.AppointmentId, "IX_payments_appointment_id");

            entity.HasIndex(e => e.CasherId, "IX_payments_casher_id");

            entity.HasIndex(e => e.CustomerId, "IX_payments_customer_id");

            entity.HasIndex(e => e.PaymentMethodId, "IX_payments_payment_method_id");

            entity.HasIndex(e => e.VoucherId, "IX_payments_voucher_id");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.CasherId).HasColumnName("casher_id");
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasColumnName("created_at");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ExpdateDate)
                .HasPrecision(0)
                .HasColumnName("expdate_date");
            entity.Property(e => e.IsAppointment).HasColumnName("is_appointment");
            entity.Property(e => e.PaymentMethodId).HasColumnName("payment_method_id");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasDefaultValue("PENDING")
                .HasColumnName("status");
            entity.Property(e => e.Subtotal)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("subtotal");
            entity.Property(e => e.Total)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("total");
            entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Payments)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("FK_payments_appointment_id");

            entity.HasOne(d => d.Casher).WithMany(p => p.Payments)
                .HasForeignKey(d => d.CasherId)
                .HasConstraintName("FK_payments_casher_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Payments)
                .HasForeignKey(d => d.CustomerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payments_customer_id");

            entity.HasOne(d => d.PaymentMethod).WithMany(p => p.Payments)
                .HasForeignKey(d => d.PaymentMethodId)
                .HasConstraintName("FK_payments_payment_method_id");

            entity.HasOne(d => d.Voucher).WithMany(p => p.Payments)
                .HasForeignKey(d => d.VoucherId)
                .HasConstraintName("FK_payments_voucher_id");
        });

        modelBuilder.Entity<PaymentService>(entity =>
        {
            entity.ToTable("payment_service");

            entity.HasIndex(e => e.BarberId, "IX_payment_service_barber_id");

            entity.HasIndex(e => e.PaymentId, "IX_payment_service_payment_id");

            entity.HasIndex(e => e.ProductId, "IX_payment_service_product_id");

            entity.HasIndex(e => e.ServiceId, "IX_payment_service_service_id");

            entity.Property(e => e.PaymentServiceId).HasColumnName("payment_service_id");
            entity.Property(e => e.BarberId).HasColumnName("barber_id");
            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Barber).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.BarberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_barber_id");

            entity.HasOne(d => d.Payment).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.PaymentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_payment_id");

            entity.HasOne(d => d.Product).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_product_id");

            entity.HasOne(d => d.Service).WithMany(p => p.PaymentServices)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_payment_service_service_id");
        });

        modelBuilder.Entity<PaymentsMethod>(entity =>
        {
            entity.HasKey(e => e.PaymentMethodId);

            entity.ToTable("payments_method");

            entity.Property(e => e.PaymentMethodId).HasColumnName("payment_method_id");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.MethodName)
                .HasMaxLength(255)
                .HasColumnName("method_name");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("products");

            entity.HasIndex(e => e.ProductTypeId, "IX_products_product_type_id");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Discount).HasColumnName("discount");
            entity.Property(e => e.Instruction).HasColumnName("instruction");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ProductName)
                .HasMaxLength(255)
                .HasColumnName("product_name");
            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");

            entity.HasOne(d => d.ProductType).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProductTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_products_product_type_id");
        });

        modelBuilder.Entity<ProductType>(entity =>
        {
            entity.ToTable("product_type");

            entity.Property(e => e.ProductTypeId).HasColumnName("product_type_id");
            entity.Property(e => e.ProductTypeName)
                .HasMaxLength(255)
                .HasColumnName("product_type_name");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__refresh___3213E83F397C64DC");

            entity.ToTable("refresh_tokens");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt)
                .HasColumnType("datetime")
                .HasColumnName("expires_at");
            entity.Property(e => e.RefreshToken1)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("refresh_token");
            entity.Property(e => e.RevokedAt)
                .HasColumnType("datetime")
                .HasColumnName("revoked_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__refresh_t__user___3493CFA7");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("reviews_review_id_primary");

            entity.ToTable("reviews");

            entity.HasIndex(e => e.AppointmentId, "IX_reviews_appointment_id");

            entity.Property(e => e.ReviewId)
                .ValueGeneratedNever()
                .HasColumnName("review_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.Comment).HasColumnName("comment");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("create_at");
            entity.Property(e => e.ImgUrl)
                .HasMaxLength(255)
                .HasColumnName("img_url");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("('1')")
                .HasColumnName("is_active");
            entity.Property(e => e.Rate).HasColumnName("rate");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.AppointmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("appointment_id_foreign");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("roles_role_id_primary");

            entity.ToTable("roles");

            entity.Property(e => e.RoleId)
                .ValueGeneratedNever()
                .HasColumnName("role_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.RoleName)
                .HasMaxLength(255)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.ToTable("services");

            entity.HasIndex(e => e.ServiceTypeId, "IX_services_service_type_id");

            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.DurationMin).HasColumnName("duration_min");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("price");
            entity.Property(e => e.ServiceImage)
                .HasColumnType("text")
                .HasColumnName("service_image");
            entity.Property(e => e.ServiceName)
                .HasMaxLength(255)
                .HasColumnName("service_name");
            entity.Property(e => e.ServiceTypeId).HasColumnName("service_type_id");

            entity.HasOne(d => d.ServiceType).WithMany(p => p.Services)
                .HasForeignKey(d => d.ServiceTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_service_serviceType");
        });

        modelBuilder.Entity<ServiceType>(entity =>
        {
            entity.HasKey(e => e.ServiceTypeId).HasName("PK__service___288B52C6B84870CB");

            entity.ToTable("service_type");

            entity.Property(e => e.ServiceTypeId).HasColumnName("service_type_id");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.ServiceTypeName)
                .HasMaxLength(255)
                .HasColumnName("service_type_name");
        });

        modelBuilder.Entity<Skill>(entity =>
        {
            entity.ToTable("skills");

            entity.Property(e => e.SkillId).HasColumnName("skill_id");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.SkillName)
                .HasMaxLength(255)
                .HasColumnName("skill_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");

            entity.HasIndex(e => e.RoleId, "IX_users_role_id");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.AvatarUrl)
                .HasColumnType("text")
                .HasColumnName("avatar_url");
            entity.Property(e => e.Cccd)
                .HasMaxLength(255)
                .HasColumnName("cccd");
            entity.Property(e => e.CreateAt)
                .HasPrecision(0)
                .HasColumnName("create_at");
            entity.Property(e => e.Dob).HasColumnName("dob");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.UpdatedAt)
                .HasPrecision(0)
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("roles_role_id_foreign");
        });

        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.ToTable("vouchers");

            entity.Property(e => e.VoucherId).HasColumnName("voucher_id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.DiscountType)
                .HasMaxLength(255)
                .HasColumnName("discount_type");
            entity.Property(e => e.DiscountValue)
                .HasColumnType("decimal(8, 2)")
                .HasColumnName("discount_value");
            entity.Property(e => e.Expdate)
                .HasPrecision(0)
                .HasColumnName("expdate");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Startdate)
                .HasPrecision(0)
                .HasColumnName("startdate");
            entity.Property(e => e.VoucherCode)
                .HasMaxLength(255)
                .HasColumnName("voucher_code");
            entity.Property(e => e.VoucherName)
                .HasMaxLength(255)
                .HasColumnName("voucher_name");
            entity.Property(e => e.VoucherUrl)
                .HasMaxLength(255)
                .HasColumnName("voucher_url");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
