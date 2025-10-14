import { Modal, Button, Typography } from 'antd';
import { useEffect, useState } from 'react';
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

interface ServiceItem {
    key: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
    productId?: number;
    sizeName?: string;
}

interface PaymentModalProps {
    visible: boolean;
    onClose: () => void;
    record: AppointmentDTO;
}

const { Title } = Typography;

export default function PaymentModal({
    visible,
    onClose,
    record,
}: PaymentModalProps) {
    const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
    const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
    const [selectedServiceValue, setSelectedServiceValue] = useState<
        number | undefined
    >(undefined);
    const [selectedProductValue, setSelectedProductValue] = useState<
        string | undefined
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

    useEffect(() => {
        const fetchProductType = async () => {
            try {
                const data = await GetAllProductTypeInBranchOfCashier();
                setProductTypes(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy loại sản phẩm:', error);
            }
        };

        fetchProductType();
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
                }))
            );
        }
    }, [record, visible]);

    // Hàm xử lý chọn dịch vụ
    const handleSelectService = (serviceId: number) => {
        let foundService: any = null;
        let foundType: any = null;

        for (const type of serviceTypes) {
            const service = type.services.find(s => s.serviceId === serviceId);
            if (service) {
                foundService = service;
                foundType = type;
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
                },
            ]);
            setSelectedServiceValue(undefined);
        }
    };

    // Hàm xử lý chọn sản phẩm
    const handleSelectProduct = (value: string) => {
        console.log('Chọn sản phẩm:', value);
        const [productIdStr, sizeName] = value.split('-');
        const productId = parseInt(productIdStr);

        let foundProduct: any = null;
        // Tìm sản phẩm trong tất cả các loại sản phẩm
        for (const productType of productTypes) {
            if (productType.productDTOs) {
                foundProduct = productType.productDTOs.find(
                    (p: any) =>
                        p.productId === productId &&
                        (!sizeName || p.sizeName === sizeName)
                );
                if (foundProduct) break;
            }
        }

        if (foundProduct) {
            const price =
                foundProduct.productPriceDTO?.discountedPrice ||
                foundProduct.productPriceDTO?.originalPrice ||
                0;

            setSelectedServices(prev => [
                ...prev,
                {
                    key: prev.length + 1,
                    name: foundProduct.productName || '',
                    type: 'SP',
                    quantity: 1,
                    price: price,
                    productId: foundProduct.productId,
                    sizeName: foundProduct.sizeName || undefined,
                },
            ]);
            setSelectedProductValue(undefined);
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
                prev.map(s =>
                    s.key === key ? { ...s, quantity: newQuantity } : s
                )
            );
        }
    };

    // Tính toán giá trị cho PaymentSummary
    const subtotal = selectedServices.reduce(
        (sum, s) => sum + s.price * s.quantity,
        0
    );
    const discount = 0; // Có thể thêm logic tính giảm giá ở đây
    const total = subtotal - discount;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={700}
        >
            <Title level={4}>Thông tin thanh toán</Title>

            <CustomerInfo record={record} />

            {/* Sử dụng ServiceProductTable component */}
            <ServiceProductTable
                dataSource={selectedServices}
                onQuantityChange={handleQuantityChange}
                onRemoveService={handleRemoveService}
            />

            {/* Sử dụng ServiceSelector component */}
            <ServiceSelector
                serviceTypes={serviceTypes}
                selectedValue={selectedServiceValue}
                onSelect={handleSelectService}
                placeholder='Chọn dịch vụ để thêm'
            />

            {/* Sử dụng ProductSelector component */}
            <ProductSelector
                productTypes={productTypes}
                selectedValue={selectedProductValue}
                onSelect={handleSelectProduct}
                placeholder='Chọn sản phẩm để thêm'
            />

            {/* Sử dụng PaymentSummary component */}
            <PaymentSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
            />

            {/* Nút hành động */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <Button onClick={onClose}>Hủy</Button>
                <Button type='primary' style={{ minWidth: 120 }}>
                    Thanh toán
                </Button>
            </div>
        </Modal>
    );
}
