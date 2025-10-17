import { Modal, Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllServicesTypes } from '../../../../api/serviceTypeApi';
import type { ServiceTypeDTO } from '../../../../types/ResponseDTOs/serviceTypeDTO';
import { GetAllProductTypeInBranchOfCashier } from '../../../../api/branchesProductApi';
import type { ProductTypeDTO } from '../../../../types/ResponseDTOs/productTypeDTO';
import CustomerInfo from '../PaymentModal/CustomerInfo/CustomerInfo';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import ServiceSelector from '../PaymentModal/ServiceSelector/ServiceSelector';
import ProductSelector from './ProductSelector/ProductSelector';
import ServiceProductTable from './ServiceProductTable/ServiceProductTable';
import type { AppointmentDTO } from '../../../../types/ResponseDTOs/appointmentDTO';
import { GetPaymentsMethods } from '../../../../api/paymentsMethodApi';
import type { PaymentMethodDTO } from '../../../../types/ResponseDTOs/paymentMethodDTO';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import { createInvoice } from '../../../../api/invoiceApi';

interface ServiceItem {
    key: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
    productId?: number;
    sizeName?: string;
    serviceId?: number;
    sizeId?: number; // Thêm sizeId
}

interface PaymentModalProps {
    visible: boolean;
    onClose: () => void;
    record: AppointmentDTO;
}

// Interface cho Product với productId, sizeId, quantity và price
interface ProductInfo {
    productId: number;
    sizeId?: number;
    quantity: number;
    price: number; // Thêm price
}

// Interface cho payload API - CẬP NHẬT
interface PaymentConfirmationPayload {
    appointmentId: number;
    customerId?: number;
    subTotal: number;
    total: number;
    serviceIds: number[];
    products: ProductInfo[]; // Bao gồm productId, sizeId, quantity và price
    paymentMethodId?: number;
}

const { Title } = Typography;

export default function PaymentModal({ visible, onClose, record }: PaymentModalProps) {
    const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
    const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
    const [selectedServiceValue, setSelectedServiceValue] = useState<number | undefined>(
        undefined
    );
    const [selectedProductValue, setSelectedProductValue] = useState<string | undefined>(
        undefined
    );
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDTO[]>([]);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
        number | undefined
    >(undefined);

    useEffect(() => {
        const fetchServiceTypes = async () => {
            try {
                const data = await getAllServicesTypes();
                setServiceTypes(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy loại dịch vụ:', error);
            }
        };

        fetchServiceTypes();
    }, []);

    // Tách fetchProductType thành function riêng để có thể gọi lại
    const fetchProductType = async () => {
        try {
            const data = await GetAllProductTypeInBranchOfCashier();
            setProductTypes(data.data);
            console.log('Fetched Product Types:', data.data);
        } catch (error) {
            console.error('Lỗi khi lấy loại sản phẩm:', error);
        }
    };

    useEffect(() => {
        fetchProductType(); // Gọi khi component mount
    }, []);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const data = await GetPaymentsMethods();
                setPaymentMethods(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy phương thức thanh toán:', error);
            }
        };

        fetchPaymentMethods();
    }, []);

    // Khởi tạo dữ liệu khi mở modal
    useEffect(() => {
        if (record && visible) {
            const services = record.serviceDTOs || [];
            setSelectedServices(
                services.map((s: any, idx: number) => ({
                    key: idx + 1,
                    name: s.serviceName,
                    type: s.serviceType || 'DV',
                    quantity: s.quantity || 1,
                    price: s.price || 0,
                    serviceId: s.serviceId, // Lưu serviceId từ record
                }))
            );
        }
    }, [record, visible]);

    // Hàm xử lý chọn dịch vụ - CẬP NHẬT để lưu serviceId
    const handleSelectService = (serviceId: number) => {
        let foundService: any = null;

        for (const type of serviceTypes) {
            const service = type.services.find(s => s.serviceId === serviceId);
            if (service) {
                foundService = service;
                break;
            }
        }

        if (foundService) {
            setSelectedServices(prev => [
                ...prev,
                {
                    key: prev.length + 1,
                    name: foundService.serviceName,
                    type: 'DV',
                    quantity: 1,
                    price: foundService.price || 0,
                    serviceId: foundService.serviceId, // Lưu serviceId
                },
            ]);
            setSelectedServiceValue(undefined);
        }
    };

    // Hàm xử lý chọn sản phẩm - CẬP NHẬT để lưu sizeId
    const handleSelectProduct = (value: string) => {
        // Parse value để lấy productId, sizeId và sizeName
        const parts = value.split('-');
        const productId = parseInt(parts[0]);
        const sizeId =
            parts[1] && parts[1] !== '' && parts[1] !== 'undefined'
                ? parseInt(parts[1])
                : undefined;
        const sizeName =
            parts[2] && parts[2] !== '' && parts[2] !== 'undefined'
                ? parts[2]
                : undefined;

        console.log('Parsed values:', { productId, sizeId, sizeName });

        let foundProduct: any = null;
        for (const productType of productTypes) {
            if (productType.productDTOs) {
                foundProduct = productType.productDTOs.find((p: any) => {
                    const matchProductId = p.productId === productId;

                    // Sửa logic kiểm tra sizeId - CHÍNH XÁC
                    let matchSizeId = false;
                    if (sizeId !== undefined) {
                        // Nếu có sizeId trong value, phải match chính xác
                        matchSizeId = p.sizeId === sizeId;
                    } else {
                        // Nếu không có sizeId trong value, chỉ match khi product cũng không có sizeId
                        matchSizeId = p.sizeId === null || p.sizeId === undefined;
                    }

                    // Kiểm tra sizeName
                    let matchSizeName = false;
                    if (sizeName !== undefined) {
                        matchSizeName = p.sizeName === sizeName;
                    } else {
                        matchSizeName =
                            !p.sizeName ||
                            p.sizeName === null ||
                            p.sizeName === undefined;
                    }

                    console.log('Checking product:', {
                        productData: {
                            productId: p.productId,
                            sizeId: p.sizeId,
                            sizeName: p.sizeName,
                            productName: p.productName,
                        },
                        searchCriteria: { productId, sizeId, sizeName },
                        matches: { matchProductId, matchSizeId, matchSizeName },
                        finalResult: matchProductId && matchSizeId && matchSizeName,
                    });

                    return matchProductId && matchSizeId && matchSizeName;
                });

                if (foundProduct) {
                    console.log('✅ Found matching product:', foundProduct);
                    break;
                }
            }
        }

        if (foundProduct) {
            const price =
                foundProduct.productPriceDTO?.discountedPrice ||
                foundProduct.productPriceDTO?.originalPrice ||
                0;

            const newServiceItem = {
                key: selectedServices.length + 1, // Dùng timestamp để đảm bảo unique
                name: foundProduct.productName || '',
                type: 'SP',
                quantity: 1,
                price: price,
                productId: foundProduct.productId,
                sizeId: foundProduct.sizeId, // Lưu đúng sizeId
                sizeName: foundProduct.sizeName || undefined,
            };

            console.log('✅ Adding new service item:', newServiceItem);

            setSelectedServices(prev => [...prev, newServiceItem]);
            setSelectedProductValue(undefined);
        } else {
            console.error('❌ Không tìm thấy sản phẩm phù hợp với:', {
                productId,
                sizeId,
                sizeName,
            });
        }
    };

    // Hàm xóa dịch vụ/sản phẩm
    const handleRemoveService = (key: number) => {
        setSelectedServices(prev => prev.filter(s => s.key !== key));
    };

    // Hàm thay đổi số lượng
    const handleQuantityChange = (key: number, newQuantity: number) => {
        if (newQuantity > 0) {
            setSelectedServices(prev =>
                prev.map(s => (s.key === key ? { ...s, quantity: newQuantity } : s))
            );
        }
    };

    // Tính toán giá trị cho PaymentSummary
    const subtotal = selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0);
    const discount = 0;
    const total = subtotal - discount;

    // HÀM XỬ LÝ THANH TOÁN - CẬP NHẬT để bao gồm price
    const handlePaymentConfirmation = async () => {
        // Kiểm tra appointmentId tồn tại
        if (!record.appointmentId) {
            await Swal.fire({
                icon: 'error',
                title: 'Lỗi dữ liệu',
                text: 'Không tìm thấy ID cuộc hẹn.',
                confirmButtonText: 'Đồng ý',
                confirmButtonColor: '#ff4d4f',
            });
            return;
        }

        // Kiểm tra phương thức thanh toán
        if (!selectedPaymentMethodId) {
            await Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn phương thức thanh toán.',
                confirmButtonText: 'Đồng ý',
                confirmButtonColor: '#1677ff',
            });
            return;
        }

        // Kiểm tra có dịch vụ/sản phẩm không
        if (selectedServices.length === 0) {
            await Swal.fire({
                icon: 'warning',
                title: 'Thiếu thông tin',
                text: 'Vui lòng chọn ít nhất một dịch vụ hoặc sản phẩm.',
                confirmButtonText: 'Đồng ý',
                confirmButtonColor: '#1677ff',
            });
            return;
        }

        // Chuẩn bị payload theo format yêu cầu - CẬP NHẬT
        const serviceIds: number[] = selectedServices
            .filter(item => item.type === 'DV' && item.serviceId != null)
            .map(item => item.serviceId!)
            .filter((id, index, array) => array.indexOf(id) === index);

        // Cập nhật products để bao gồm quantity và price
        const products: ProductInfo[] = selectedServices
            .filter(item => item.type === 'SP' && item.productId != null)
            .map(item => ({
                productId: item.productId!,
                sizeId: item.sizeId, // Có thể undefined nếu không có size
                quantity: item.quantity,
                price: item.price, // Thêm price từ selectedServices
            }))
            .reduce((acc: ProductInfo[], current) => {
                // Tìm xem đã có product với cùng productId và sizeId chưa
                const existingIndex = acc.findIndex(
                    p => p.productId === current.productId && p.sizeId === current.sizeId
                );

                if (existingIndex !== -1) {
                    // Nếu đã có, cộng thêm quantity (giữ nguyên price)
                    acc[existingIndex].quantity += current.quantity;
                } else {
                    // Nếu chưa có, thêm mới
                    acc.push(current);
                }

                return acc;
            }, []);

        const payload: PaymentConfirmationPayload = {
            appointmentId: record.appointmentId,
            customerId: record.userDTO?.userId,
            subTotal: subtotal,
            total: total,
            serviceIds: serviceIds,
            products: products, // Bao gồm productId, sizeId, quantity và price
            paymentMethodId: selectedPaymentMethodId,
        };

        console.log('Payment Payload:', payload);

        // Tính tổng quantity để hiển thị
        const totalProductQuantity = products.reduce((sum, p) => sum + p.quantity, 0);

        // Xác nhận thanh toán - CẬP NHẬT thông tin hiển thị
        const result = await Swal.fire({
            icon: 'question',
            title: 'Xác nhận thanh toán',
            html: `
                <div style="text-align: left; margin: 10px 0;">
                    <p><strong>Tổng tiền:</strong> ${total.toLocaleString('vi-VN')}đ</p>
                    <p><strong>Dịch vụ:</strong> ${serviceIds.length} loại</p>
                    <p><strong>Sản phẩm:</strong> ${
                        products.length
                    } loại (${totalProductQuantity} sản phẩm)</p>
                </div>
                <p>Bạn có chắc chắn muốn xác nhận thanh toán?</p>
            `,
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#52c41a',
            cancelButtonColor: '#ff4d4f',
        });

        if (result.isConfirmed) {
            try {
                // TODO: Gọi API thanh toán ở đây khi bạn cung cấp
                // await paymentApi.confirmPayment(payload);
                const response = await createInvoice(payload);
                console.log('Payment API response:', response);
                fetchProductType();
                // Tạm thời log payload để test
                // console.log(
                //     'Calling API with payload:',
                //     JSON.stringify(payload, null, 2)
                // );

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Thanh toán đã được xác nhận thành công.',
                    confirmButtonText: 'Đồng ý',
                    confirmButtonColor: '#52c41a',
                    timer: 2000,
                    timerProgressBar: true,
                });

                onClose();
            } catch (error) {
                console.error('Payment error:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.',
                    confirmButtonText: 'Đồng ý',
                    confirmButtonColor: '#ff4d4f',
                });
            }
        }
    };

    return (
        console.log('selectedServices', selectedServices),
        (
            <Modal open={visible} onCancel={onClose} footer={null} centered width={700}>
                <Title level={4}>Thông tin thanh toán</Title>

                <CustomerInfo record={record} />

                <ServiceProductTable
                    dataSource={selectedServices}
                    onQuantityChange={handleQuantityChange}
                    onRemoveService={handleRemoveService}
                />

                <ServiceSelector
                    serviceTypes={serviceTypes}
                    selectedValue={selectedServiceValue}
                    onSelect={handleSelectService}
                    placeholder='Chọn dịch vụ để thêm'
                />

                <ProductSelector
                    productTypes={productTypes}
                    selectedValue={selectedProductValue}
                    onSelect={handleSelectProduct}
                    placeholder='Chọn sản phẩm để thêm'
                />

                <PaymentMethod
                    total={total}
                    paymentMethods={paymentMethods}
                    selectedMethodId={selectedPaymentMethodId}
                    onSelectPaymentMethod={setSelectedPaymentMethodId}
                />

                <PaymentSummary subtotal={subtotal} discount={discount} total={total} />

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button
                        type='primary'
                        style={{ minWidth: 120 }}
                        onClick={handlePaymentConfirmation}
                    >
                        Đã xác nhận thanh toán
                    </Button>
                </div>
            </Modal>
        )
    );
}
