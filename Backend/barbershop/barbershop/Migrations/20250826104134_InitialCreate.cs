using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace barbershop.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "branchs",
                columns: table => new
                {
                    branch_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    province_city = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    ward_commune = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    location_detail = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    branch_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    time_on = table.Column<TimeOnly>(type: "time", nullable: true),
                    time_off = table.Column<TimeOnly>(type: "time", nullable: true),
                    branch_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.branch_id);
                });

            migrationBuilder.CreateTable(
                name: "payments_method",
                columns: table => new
                {
                    payment_method_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    method_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    img_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payments_method", x => x.payment_method_id);
                });

            migrationBuilder.CreateTable(
                name: "product_type",
                columns: table => new
                {
                    product_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_type_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product_type", x => x.product_type_id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "int", nullable: false),
                    role_name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("roles_role_id_primary", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "service_type",
                columns: table => new
                {
                    service_type_id = table.Column<int>(type: "int", nullable: false),
                    service_type_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("service_type_service_type_id_primary", x => x.service_type_id);
                });

            migrationBuilder.CreateTable(
                name: "skills",
                columns: table => new
                {
                    skill_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    skill_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_skills", x => x.skill_id);
                });

            migrationBuilder.CreateTable(
                name: "vouchers",
                columns: table => new
                {
                    voucher_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    voucher_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    voucher_code = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    discount_type = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    discount_value = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    startdate = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    expdate = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    voucher_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vouchers", x => x.voucher_id);
                });

            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    employee_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    branch_id = table.Column<int>(type: "int", nullable: false),
                    experience_years = table.Column<int>(type: "int", nullable: false),
                    rating = table.Column<decimal>(type: "decimal(8,2)", nullable: true, defaultValue: 0m),
                    quantity_rate = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    avatar_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.employee_id);
                    table.ForeignKey(
                        name: "FK_employees_location_id",
                        column: x => x.branch_id,
                        principalTable: "branchs",
                        principalColumn: "branch_id");
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    product_type_id = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    discount = table.Column<int>(type: "int", nullable: false),
                    instruction = table.Column<string>(type: "text", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_products_product_type_id",
                        column: x => x.product_type_id,
                        principalTable: "product_type",
                        principalColumn: "product_type_id");
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    user_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    username = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    full_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    phone = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    dob = table.Column<DateOnly>(type: "date", nullable: true),
                    address = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    cccd = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    role_id = table.Column<int>(type: "int", nullable: false),
                    create_at = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    updated_at = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.user_id);
                    table.ForeignKey(
                        name: "roles_role_id_foreign",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "role_id");
                });

            migrationBuilder.CreateTable(
                name: "services",
                columns: table => new
                {
                    service_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    service_name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    service_type_id = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    price = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    duration_min = table.Column<int>(type: "int", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_services", x => x.service_id);
                    table.ForeignKey(
                        name: "services_service_type_id_foreign",
                        column: x => x.service_type_id,
                        principalTable: "service_type",
                        principalColumn: "service_type_id");
                });

            migrationBuilder.CreateTable(
                name: "employee_img_hair",
                columns: table => new
                {
                    employee_img_hair_id = table.Column<int>(type: "int", nullable: false),
                    employee_id = table.Column<int>(type: "int", nullable: false),
                    img_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "('1')")
                },
                constraints: table =>
                {
                    table.PrimaryKey("employee_img_hair_employee_img_hair_id_primary", x => x.employee_img_hair_id);
                    table.ForeignKey(
                        name: "employee_img_hair_img_url_foreign",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "employee_id");
                });

            migrationBuilder.CreateTable(
                name: "employee_skill",
                columns: table => new
                {
                    employee_skill_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    employee_id = table.Column<int>(type: "int", nullable: false),
                    skill_id = table.Column<int>(type: "int", nullable: false),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee_skill", x => x.employee_skill_id);
                    table.ForeignKey(
                        name: "FK_employee_skill_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "employee_id");
                    table.ForeignKey(
                        name: "FK_employee_skill_skill_id",
                        column: x => x.skill_id,
                        principalTable: "skills",
                        principalColumn: "skill_id");
                });

            migrationBuilder.CreateTable(
                name: "inventory",
                columns: table => new
                {
                    inventory_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: true),
                    last_updated = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_inventory", x => x.inventory_id);
                    table.ForeignKey(
                        name: "FK_inventory_product_id",
                        column: x => x.product_id,
                        principalTable: "products",
                        principalColumn: "product_id");
                });

            migrationBuilder.CreateTable(
                name: "appointments",
                columns: table => new
                {
                    appointment_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<long>(type: "bigint", nullable: false),
                    barber_id = table.Column<int>(type: "int", nullable: false),
                    branch_id = table.Column<int>(type: "int", nullable: false),
                    appointment_date = table.Column<DateOnly>(type: "date", nullable: true),
                    appointment_time = table.Column<TimeOnly>(type: "time(0)", precision: 0, nullable: true),
                    status = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false, defaultValue: "BOOKED"),
                    created_at = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    note = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointments", x => x.appointment_id);
                    table.ForeignKey(
                        name: "FK_appointments_barber_id",
                        column: x => x.barber_id,
                        principalTable: "employees",
                        principalColumn: "employee_id");
                    table.ForeignKey(
                        name: "FK_appointments_location_id",
                        column: x => x.branch_id,
                        principalTable: "branchs",
                        principalColumn: "branch_id");
                    table.ForeignKey(
                        name: "FK_appointments_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                });

            migrationBuilder.CreateTable(
                name: "appointment_service",
                columns: table => new
                {
                    appointment_service_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    appointment_id = table.Column<long>(type: "bigint", nullable: false),
                    service_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment_service", x => x.appointment_service_id);
                    table.ForeignKey(
                        name: "FK_appointment_service_appointment_id",
                        column: x => x.appointment_id,
                        principalTable: "appointments",
                        principalColumn: "appointment_id");
                    table.ForeignKey(
                        name: "FK_appointment_service_service_id",
                        column: x => x.service_id,
                        principalTable: "services",
                        principalColumn: "service_id");
                });

            migrationBuilder.CreateTable(
                name: "payments",
                columns: table => new
                {
                    payment_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    is_appointment = table.Column<bool>(type: "bit", nullable: true),
                    appointment_id = table.Column<long>(type: "bigint", nullable: true),
                    payment_method_id = table.Column<int>(type: "int", nullable: true),
                    customer_id = table.Column<long>(type: "bigint", nullable: false),
                    casher_id = table.Column<int>(type: "int", nullable: true),
                    subtotal = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    voucher_id = table.Column<int>(type: "int", nullable: true),
                    total = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    status = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false, defaultValue: "PENDING"),
                    created_at = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    expdate_date = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payments", x => x.payment_id);
                    table.ForeignKey(
                        name: "FK_payments_appointment_id",
                        column: x => x.appointment_id,
                        principalTable: "appointments",
                        principalColumn: "appointment_id");
                    table.ForeignKey(
                        name: "FK_payments_casher_id",
                        column: x => x.casher_id,
                        principalTable: "employees",
                        principalColumn: "employee_id");
                    table.ForeignKey(
                        name: "FK_payments_customer_id",
                        column: x => x.customer_id,
                        principalTable: "users",
                        principalColumn: "user_id");
                    table.ForeignKey(
                        name: "FK_payments_payment_method_id",
                        column: x => x.payment_method_id,
                        principalTable: "payments_method",
                        principalColumn: "payment_method_id");
                    table.ForeignKey(
                        name: "FK_payments_voucher_id",
                        column: x => x.voucher_id,
                        principalTable: "vouchers",
                        principalColumn: "voucher_id");
                });

            migrationBuilder.CreateTable(
                name: "reviews",
                columns: table => new
                {
                    review_id = table.Column<long>(type: "bigint", nullable: false),
                    appointment_id = table.Column<long>(type: "bigint", nullable: false),
                    rate = table.Column<int>(type: "int", nullable: false),
                    comment = table.Column<string>(type: "text", nullable: true),
                    create_at = table.Column<DateTime>(type: "datetime", nullable: true),
                    img_url = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "('1')")
                },
                constraints: table =>
                {
                    table.PrimaryKey("reviews_review_id_primary", x => x.review_id);
                    table.ForeignKey(
                        name: "appointment_id_foreign",
                        column: x => x.appointment_id,
                        principalTable: "appointments",
                        principalColumn: "appointment_id");
                });

            migrationBuilder.CreateTable(
                name: "payment_service",
                columns: table => new
                {
                    payment_service_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    payment_id = table.Column<long>(type: "bigint", nullable: false),
                    service_id = table.Column<int>(type: "int", nullable: false),
                    barber_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<decimal>(type: "decimal(8,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payment_service", x => x.payment_service_id);
                    table.ForeignKey(
                        name: "FK_payment_service_barber_id",
                        column: x => x.barber_id,
                        principalTable: "employees",
                        principalColumn: "employee_id");
                    table.ForeignKey(
                        name: "FK_payment_service_payment_id",
                        column: x => x.payment_id,
                        principalTable: "payments",
                        principalColumn: "payment_id");
                    table.ForeignKey(
                        name: "FK_payment_service_product_id",
                        column: x => x.product_id,
                        principalTable: "products",
                        principalColumn: "product_id");
                    table.ForeignKey(
                        name: "FK_payment_service_service_id",
                        column: x => x.service_id,
                        principalTable: "services",
                        principalColumn: "service_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_appointment_service_appointment_id",
                table: "appointment_service",
                column: "appointment_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_service_service_id",
                table: "appointment_service",
                column: "service_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_barber_id",
                table: "appointments",
                column: "barber_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_branch_id",
                table: "appointments",
                column: "branch_id");

            migrationBuilder.CreateIndex(
                name: "IX_appointments_user_id",
                table: "appointments",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_img_hair_employee_id",
                table: "employee_img_hair",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_skill_employee_id",
                table: "employee_skill",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_skill_skill_id",
                table: "employee_skill",
                column: "skill_id");

            migrationBuilder.CreateIndex(
                name: "IX_employees_branch_id",
                table: "employees",
                column: "branch_id");

            migrationBuilder.CreateIndex(
                name: "IX_inventory_product_id",
                table: "inventory",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_service_barber_id",
                table: "payment_service",
                column: "barber_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_service_payment_id",
                table: "payment_service",
                column: "payment_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_service_product_id",
                table: "payment_service",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_payment_service_service_id",
                table: "payment_service",
                column: "service_id");

            migrationBuilder.CreateIndex(
                name: "IX_payments_appointment_id",
                table: "payments",
                column: "appointment_id");

            migrationBuilder.CreateIndex(
                name: "IX_payments_casher_id",
                table: "payments",
                column: "casher_id");

            migrationBuilder.CreateIndex(
                name: "IX_payments_customer_id",
                table: "payments",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "IX_payments_payment_method_id",
                table: "payments",
                column: "payment_method_id");

            migrationBuilder.CreateIndex(
                name: "IX_payments_voucher_id",
                table: "payments",
                column: "voucher_id");

            migrationBuilder.CreateIndex(
                name: "IX_products_product_type_id",
                table: "products",
                column: "product_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_reviews_appointment_id",
                table: "reviews",
                column: "appointment_id");

            migrationBuilder.CreateIndex(
                name: "IX_services_service_type_id",
                table: "services",
                column: "service_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_role_id",
                table: "users",
                column: "role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "appointment_service");

            migrationBuilder.DropTable(
                name: "employee_img_hair");

            migrationBuilder.DropTable(
                name: "employee_skill");

            migrationBuilder.DropTable(
                name: "inventory");

            migrationBuilder.DropTable(
                name: "payment_service");

            migrationBuilder.DropTable(
                name: "reviews");

            migrationBuilder.DropTable(
                name: "skills");

            migrationBuilder.DropTable(
                name: "payments");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "services");

            migrationBuilder.DropTable(
                name: "appointments");

            migrationBuilder.DropTable(
                name: "payments_method");

            migrationBuilder.DropTable(
                name: "vouchers");

            migrationBuilder.DropTable(
                name: "product_type");

            migrationBuilder.DropTable(
                name: "service_type");

            migrationBuilder.DropTable(
                name: "employees");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "branchs");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
