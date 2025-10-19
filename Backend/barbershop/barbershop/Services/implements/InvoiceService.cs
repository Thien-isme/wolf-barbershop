﻿using barbershop.Models.Entitys;
using barbershop.Models.RequestDTOs;
using barbershop.Models.ResponseDTOs;
using barbershop.Repositorys.implements;
using Google.Apis.Util;

namespace barbershop.Services.implements
{
    public class InvoiceService
    {
        private readonly InvoiceRepository _invoiceRepository;
        private readonly AppointmentRepository _appointmentRepository = new AppointmentRepository();
        private readonly InvoiceDetailRepository _invoiceDetailRepository = new InvoiceDetailRepository();
        private readonly ServiceRepository _serviceRepository = new ServiceRepository();
        private readonly BranchesProductRepository _branchesProductRepository = new BranchesProductRepository();
        private readonly EmployeeRepository _employeeRepository = new EmployeeRepository();
        private readonly LoyaltyPointRepository _loyaltyPointRepository = new LoyaltyPointRepository();
        public InvoiceService()
        {
            _invoiceRepository = new InvoiceRepository();
        }


        public async Task<BaseResponse> CreateInvoice(CreateInvoiceRequest invoice, string? cashierId)
        {
            try
            {
                long appointmentId = invoice.AppointmentId;
                long customerId = invoice.CustomerId;
                decimal subTotal = invoice.SubTotal;
                decimal total = invoice.Total;
                List<int> serviceIds = invoice.ServiceIds;
                List<ProductInvoiceRequest> products = invoice.Products;

                // Create invoice entity
                Invoice invoiceEntity = new Invoice
                {
                    AppointmentId = appointmentId,
                    CustomerId = customerId,
                    Subtotal = subTotal,
                    Total = total,
                    CashierId = int.Parse(cashierId!),
                    PaymentMethodId = invoice.PaymentMethodId,
                    IsAppointment = appointmentId > 0 ? true : false,
                    Status = "PAID",
                };
                await _invoiceRepository.CreateInvoiceAsync(invoiceEntity);


                // Update appointment status
                await _appointmentRepository.UpdateStatus(appointmentId, "COMPLETED");

                // Create invoice details for services
                foreach (var serviceId in serviceIds)
                {
                    InvoiceDetail invoiceDetail = new InvoiceDetail
                    {
                        InvoiceId = invoiceEntity.InvoiceId,
                        ServiceId = serviceId,
                        Quantity = 1,
                        Price = await _serviceRepository.GetServicePriceAsync(serviceId),
                    };
                    await _invoiceDetailRepository.CreateInvoiceDetailAsync(invoiceDetail);
                }

                // Find branch id from appointment
                var branchId = await _employeeRepository.GetBranchIdByEmployeeId(int.Parse(cashierId!));
                // Create invoice details for products AND update quantity for products in branch's
                foreach (var product in products)
                {
                    InvoiceDetail invoiceDetail = new InvoiceDetail
                    {
                        InvoiceId = invoiceEntity.InvoiceId,
                        ProductId = product.ProductId,
                        Quantity = product.Quantity,
                        SizeId = product.SizeId,
                        Price = product.Price,
                    };
                    await _invoiceDetailRepository.CreateInvoiceDetailAsync(invoiceDetail);
                    await _branchesProductRepository.ReduceQuantityProductSelled(branchId, product.ProductId, product.Quantity, product.SizeId);
                }

                // Plus point for customer
                int pointEarned = (int)(total / 10000);
                await _loyaltyPointRepository.PlusLoyaltyPoints(customerId, pointEarned);


                return new BaseResponse
                {
                    Status = 201,
                    MessageHide = "Create invoice successfully",
                    MessageShow = "Tạo hóa đơn thành công",
                    Data = null
                };

            } catch (Exception ex) {
                return new BaseResponse
                {
                    Status = 500,
                    MessageHide = ex.ToString(),
                    MessageShow = "Đã có lỗi trong lúc thực thi",
                    Data = null
                };
            }
        }
    }
}
