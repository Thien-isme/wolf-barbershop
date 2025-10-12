import { Modal, Table, Button, Typography, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { getAllServicesTypes } from '../../../api/serviceTypeApi';
import type { ServiceTypeDTO } from '../../../types/ResponseDTOs/serviceTypeDTO';

import { GetAllProductInBranch } from '../../../api/branchesProductApi';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';

// import { GetPaymentsMethods } from '../../../api/paymentsMethodApi';
// import type { PaymentsMethodDTO } from '../../../types/ResponseDTOs/paymentsMethodDTO';

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
    record: any;
}

const { Title } = Typography;
const { Option, OptGroup } = Select;

export default function PaymentModal({
    visible,
    onClose,
    record,
}: PaymentModalProps) {
    if (!record) return null;

    const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
    // State lưu dịch vụ đã chọn
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [selectedServiceValue, setSelectedServiceValue] = useState<
        number | undefined
    >(undefined);
    const [selectedProductValue, setSelectedProductValue] = useState<
        string | undefined
    >(undefined);
    // const [paymentMethods, setPaymentMethods] = useState<PaymentsMethodDTO[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getAllServicesTypes();
                const activeServiceTypes = response.data
                    .filter((st: ServiceTypeDTO) => st.isActive)
                    .map((st: ServiceTypeDTO) => ({
                        ...st,
                        services: st.services.filter(s => s.isActive),
                    }));
                setServiceTypes(activeServiceTypes);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();

        const fetchProducts = async () => {
            try {
                const response = await GetAllProductInBranch(); // Giả sử branchId = 1
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();

        const fetchPaymentMethods = async () => {
            try {
                // const response = await GetPaymentsMethods();
                // setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };
        fetchPaymentMethods();
    }, []);

    // Khi mở modal, reset selectedServices từ record
    useEffect(() => {
        if (record) {
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
    }, [record]);

    // Hàm xử lý chọn dịch vụ
    const handleSelectService = (serviceId: number) => {
        // Tìm dịch vụ trong serviceTypes
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
                    type: foundType?.serviceTypeName
                        ? 'DV'
                        : foundType?.serviceTypeName,
                    quantity: 1,
                    price: foundService.price || 0,
                },
            ]);
            // Reset giá trị Select về mặc định
            setSelectedServiceValue(undefined);
        }
    };

    // Hàm xử lý chọn sản phẩm
    const handleSelectProduct = (value: string) => {
        // value format: "productId-sizeName" hoặc chỉ "productId"
        const [productIdStr, sizeName] = value.split('-');
        const productId = parseInt(productIdStr);

        const foundProduct = products.find(
            p =>
                p.productId === productId &&
                (!sizeName || p.sizeName === sizeName)
        );
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
                    sizeName: sizeName || undefined,
                },
            ]);
            // Reset giá trị Select về mặc định
            setSelectedProductValue(undefined);
        }
    };

    // Nhóm sản phẩm theo productTypeName
    const groupedProducts = products.reduce((acc: any, product: any) => {
        const typeName = product.productTypeName || 'Khác';
        if (!acc[typeName]) {
            acc[typeName] = [];
        }
        acc[typeName].push(product);
        return acc;
    }, {});

    // Hàm xóa dịch vụ
    const handleRemoveService = (key: number) => {
        setSelectedServices(prev => prev.filter(s => s.key !== key));
    };

    const columns: ColumnsType<ServiceItem> = [
        {
            title: '',
            dataIndex: 'key',
            key: 'key',
            width: 40,
            align: 'center',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 60,
            align: 'center',
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 40,
            align: 'center',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            align: 'right',
            render: (price: number) => `${price.toLocaleString('vi-VN')} đ`,
        },
        {
            title: '',
            key: 'action',
            width: 60,
            align: 'center',
            render: (_, item) => (
                <Button
                    danger
                    size='small'
                    onClick={() => handleRemoveService(item.key)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const total = selectedServices.reduce(
        (sum, s) => sum + s.price * s.quantity,
        0
    );

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            width={600}
            bodyStyle={{ borderRadius: 24, padding: 32, background: '#fff' }}
        >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Title level={4}>Thông tin thanh toán</Title>
            </div>
            <div style={{ marginBottom: 16 }}>
                <div>
                    <b>Tên KH:</b> {record.userDTO.fullName}
                </div>
                <div>
                    <b>SĐT:</b> {record.userDTO.phone}
                </div>
            </div>
            <div style={{ marginBottom: 16 }}>
                <b>Thông tin dịch vụ</b>
                <Table
                    columns={columns}
                    dataSource={selectedServices}
                    pagination={false}
                    size='small'
                    style={{ marginTop: 8 }}
                    bordered
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 24,
                    margin: '16px 0',
                }}
            >
                <div style={{ minWidth: 320 }}>
                    <Select
                        showSearch
                        placeholder='Chọn dịch vụ'
                        style={{ width: '100%' }}
                        optionFilterProp='children'
                        value={selectedServiceValue}
                        onSelect={handleSelectService}
                        filterOption={(input, option) =>
                            String(option?.children || '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    >
                        {serviceTypes.map(type => (
                            <OptGroup
                                key={type.serviceTypeId}
                                label={type.serviceTypeName}
                            >
                                {type.services.map(service => (
                                    <Option
                                        key={service.serviceId}
                                        value={service.serviceId}
                                    >
                                        <span>{service.serviceName}</span>
                                        <span
                                            style={{
                                                float: 'right',
                                                color: '#888',
                                            }}
                                        >
                                            {service.price?.toLocaleString(
                                                'vi-VN'
                                            )}
                                            đ
                                        </span>
                                    </Option>
                                ))}
                            </OptGroup>
                        ))}
                    </Select>
                </div>
            </div>
            <div
                style={{
                    margin: '16px 0',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div style={{ minWidth: 320 }}>
                    <Select
                        showSearch
                        placeholder='Chọn sản phẩm'
                        style={{ width: '100%' }}
                        optionFilterProp='children'
                        value={selectedProductValue}
                        onSelect={handleSelectProduct}
                        filterOption={(input, option) =>
                            String(option?.children || '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    >
                        {Object.entries(groupedProducts).map(
                            ([typeName, productsInType]) => (
                                <OptGroup key={typeName} label={typeName}>
                                    {(productsInType as any[]).map(
                                        (product: any) => (
                                            <Option
                                                key={`${product.productId}-${
                                                    product.sizeName || ''
                                                }`}
                                                value={`${product.productId}${
                                                    product.sizeName
                                                        ? '-' + product.sizeName
                                                        : ''
                                                }`}
                                            >
                                                <span>
                                                    {product.productName}
                                                    {product.sizeName
                                                        ? ` (${product.sizeName})`
                                                        : ''}
                                                </span>
                                                <span
                                                    style={{
                                                        float: 'right',
                                                        color: '#888',
                                                    }}
                                                >
                                                    {(
                                                        product.productPriceDTO
                                                            ?.discountedPrice ||
                                                        product.productPriceDTO
                                                            ?.originalPrice ||
                                                        0
                                                    ).toLocaleString('vi-VN')}
                                                    đ
                                                </span>
                                            </Option>
                                        )
                                    )}
                                </OptGroup>
                            )
                        )}
                    </Select>
                </div>
            </div>
            <div style={{ textAlign: 'right', marginBottom: 8 }}>
                <div>Tạm tính: {total.toLocaleString('vi-VN')} đ</div>
                <div>Giảm giá: 0 đ</div>
                <div style={{ fontWeight: 600, fontSize: 18 }}>
                    Tổng tiền: {total.toLocaleString('vi-VN')} đ
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button type='primary' style={{ minWidth: 120 }}>
                    Tiếp tục
                </Button>
            </div>
        </Modal>
    );
}
