import { useEffect, useState } from 'react';
import {
    Card,
    Button,
    Radio,
    Space,
    Avatar,
    message,
    AutoComplete,
    Input,
    Select,
} from 'antd';
import { GetUsersToCreateInvoice } from '../../../../api/userApi';
import type { UserDTO } from '../../../../types/ResponseDTOs/userDTO';
import { getAllServicesTypes } from '../../../../api/serviceTypeApi';
import type { ServiceTypeDTO } from '../../../../types/ResponseDTOs/serviceTypeDTO';
import { GetAllProductTypeInBranchOfCashier } from '../../../../api/branchesProductApi';
import type { ProductTypeDTO } from '../../../../types/ResponseDTOs/productTypeDTO';
import ServiceProductTable from '../../AppointmentsManagement/PaymentModal/ServiceProductTable/ServiceProductTable';
import ServiceSelector from '../../AppointmentsManagement/PaymentModal/ServiceSelector/ServiceSelector';
import ProductSelector from '../../AppointmentsManagement/PaymentModal/ProductSelector/ProductSelector';

const { Option } = Select;

interface ServiceItem {
    key: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
    productId?: number;
    sizeName?: string;
    serviceId?: number;
    sizeId?: number;
}

interface BarberInfo {
    barberId: number;
    barberName: string;
    barberAvatar?: string;
}

function InvoiceManagementBody() {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'bank'>('cash');
    const [customers, setCustomers] = useState<UserDTO[]>([]);
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>('');
    const [selectedCustomer, setSelectedCustomer] = useState<UserDTO | null>(null);
    const [customerOptions, setCustomerOptions] = useState<UserDTO[]>([]);
    const [isNewCustomer, setIsNewCustomer] = useState<boolean>(false);

    // State cho Barber
    const [barbers, setBarbers] = useState<BarberInfo[]>([]);
    const [selectedBarber, setSelectedBarber] = useState<BarberInfo | null>(null);

    // State cho Service và Product
    const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
    const [productTypes, setProductTypes] = useState<ProductTypeDTO[]>([]);
    const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
    const [selectedServiceValue, setSelectedServiceValue] = useState<number | undefined>(
        undefined
    );
    const [selectedProductValue, setSelectedProductValue] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetUsersToCreateInvoice();
                console.log('Users for invoice:', data);
                setCustomers(data.data || []);
            } catch (error) {
                console.error('Failed to fetch users for invoice:', error);
                message.error('Không thể tải danh sách khách hàng');
            }
        };

        const fetchBarbers = async () => {
            try {
                // TODO: Thay bằng API thực của bạn
                // const data = await GetBarbersByBranch();
                // setBarbers(data.data || []);

                // Mock data tạm thời
                const mockBarbers: BarberInfo[] = [
                    {
                        barberId: 1,
                        barberName: 'Nguyễn Văn A',
                        barberAvatar: 'https://via.placeholder.com/80?text=Barber+A',
                    },
                    {
                        barberId: 2,
                        barberName: 'Trần Văn B',
                        barberAvatar: 'https://via.placeholder.com/80?text=Barber+B',
                    },
                    {
                        barberId: 3,
                        barberName: 'Lê Văn C',
                        barberAvatar: 'https://via.placeholder.com/80?text=Barber+C',
                    },
                ];
                setBarbers(mockBarbers);
            } catch (error) {
                console.error('Failed to fetch barbers:', error);
                message.error('Không thể tải danh sách barber');
            }
        };

        const fetchServiceTypes = async () => {
            try {
                const data = await getAllServicesTypes();
                setServiceTypes(data.data || []);
            } catch (error) {
                console.error('Lỗi khi lấy loại dịch vụ:', error);
                message.error('Không thể tải danh sách dịch vụ');
            }
        };

        const fetchProductTypes = async () => {
            try {
                const data = await GetAllProductTypeInBranchOfCashier();
                setProductTypes(data.data || []);
                console.log('Fetched Product Types:', data.data);
            } catch (error) {
                console.error('Lỗi khi lấy loại sản phẩm:', error);
                message.error('Không thể tải danh sách sản phẩm');
            }
        };

        fetchUsers();
        fetchBarbers();
        fetchServiceTypes();
        fetchProductTypes();
    }, []);

    // Tìm kiếm khách hàng theo SĐT
    const handleSearchCustomer = (searchText: string) => {
        setCustomerPhone(searchText);

        if (!searchText) {
            setCustomerOptions([]);
            setCustomerName('');
            setSelectedCustomer(null);
            setIsNewCustomer(false);
            return;
        }

        const filteredCustomers = customers.filter(customer =>
            customer.phone?.includes(searchText)
        );

        setCustomerOptions(filteredCustomers);

        if (filteredCustomers.length === 0) {
            setCustomerName('');
            setSelectedCustomer(null);
            setIsNewCustomer(true);
        } else {
            setIsNewCustomer(false);
        }
    };

    // Chọn khách hàng từ danh sách
    const handleSelectCustomer = (value: string) => {
        setCustomerPhone(value);

        const customer = customerOptions.find(c => c.phone === value);
        if (customer) {
            setCustomerName(customer.fullName || '');
            setSelectedCustomer(customer);
            setIsNewCustomer(false);
        }
    };

    // Xử lý thay đổi tên khách hàng (cho khách mới)
    const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerName(e.target.value);
    };

    // Chọn Barber
    const handleSelectBarber = (barberId: number) => {
        const barber = barbers.find(b => b.barberId === barberId);
        if (barber) {
            setSelectedBarber(barber);
        }
    };

    // Hàm xử lý chọn dịch vụ
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
                    key: Date.now(), // Sử dụng timestamp để đảm bảo unique
                    name: foundService.serviceName,
                    type: 'DV',
                    quantity: 1,
                    price: foundService.price || 0,
                    serviceId: foundService.serviceId,
                },
            ]);
            setSelectedServiceValue(undefined);
        }
    };

    // Hàm xử lý chọn sản phẩm
    const handleSelectProduct = (value: string) => {
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

                    let matchSizeId = false;
                    if (sizeId !== undefined) {
                        matchSizeId = p.sizeId === sizeId;
                    } else {
                        matchSizeId = p.sizeId === null || p.sizeId === undefined;
                    }

                    let matchSizeName = false;
                    if (sizeName !== undefined) {
                        matchSizeName = p.sizeName === sizeName;
                    } else {
                        matchSizeName =
                            !p.sizeName ||
                            p.sizeName === null ||
                            p.sizeName === undefined;
                    }

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
                key: Date.now(),
                name: foundProduct.productName || '',
                type: 'SP',
                quantity: 1,
                price: price,
                productId: foundProduct.productId,
                sizeId: foundProduct.sizeId,
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

    // Tính toán tổng tiền
    const subtotal = selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0);
    const total = subtotal;

    // Xử lý thanh toán
    const handlePayment = () => {
        if (!customerPhone) {
            message.warning('Vui lòng nhập số điện thoại khách hàng');
            return;
        }

        if (isNewCustomer && !customerName.trim()) {
            message.warning('Vui lòng nhập tên khách hàng');
            return;
        }

        if (!selectedBarber) {
            message.warning('Vui lòng chọn Barber');
            return;
        }

        if (selectedServices.length === 0) {
            message.warning('Vui lòng chọn ít nhất một dịch vụ hoặc sản phẩm');
            return;
        }

        // TODO: Gọi API tạo hóa đơn
        console.log('Payment data:', {
            customer: selectedCustomer,
            isNewCustomer,
            customerPhone,
            customerName,
            barber: selectedBarber,
            services: selectedServices,
            paymentMethod,
            total,
        });

        message.success('Khách hàng đã thanh toán thành công!');
    };

    return (
        <div
            style={{
                padding: 24,
                background: '#f0f2f5',
                minHeight: 'calc(100vh - 64px)',
            }}
        >
            <Card
                title={
                    <div style={{ fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
                        Tạo hóa đơn
                    </div>
                }
                style={{ maxWidth: 1200, margin: '0 auto' }}
            >
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                    {/* Thông tin khách hàng */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                            Thông tin khách hàng
                        </h3>
                        <div style={{ marginBottom: 12 }}>
                            <strong>SĐT:</strong>
                            <AutoComplete
                                style={{ width: '100%', marginTop: 4 }}
                                options={customerOptions.map(customer => ({
                                    value: customer.phone || '',
                                    label: `${customer.phone} - ${customer.fullName}`,
                                }))}
                                onSearch={handleSearchCustomer}
                                onSelect={handleSelectCustomer}
                                value={customerPhone}
                                placeholder='Nhập số điện thoại khách hàng'
                                allowClear
                                filterOption={false}
                            />
                        </div>
                        <div>
                            <strong>Tên:</strong>
                            {isNewCustomer || !selectedCustomer ? (
                                <Input
                                    style={{ width: '100%', marginTop: 4 }}
                                    value={customerName}
                                    onChange={handleCustomerNameChange}
                                    placeholder='Nhập tên khách hàng'
                                    disabled={!customerPhone}
                                />
                            ) : (
                                <span style={{ marginLeft: 8 }}>{customerName}</span>
                            )}
                            {isNewCustomer && customerPhone && (
                                <div
                                    style={{
                                        fontSize: 12,
                                        color: '#ff9800',
                                        marginTop: 4,
                                    }}
                                >
                                    * Khách hàng mới - Vui lòng nhập tên để tạo tài khoản
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Barber được chọn */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                            Barber được chọn
                        </h3>
                        <Select
                            style={{ width: '100%', marginBottom: 12 }}
                            placeholder='Chọn Barber'
                            value={selectedBarber?.barberId}
                            onChange={handleSelectBarber}
                            options={barbers.map(barber => ({
                                value: barber.barberId,
                                label: barber.barberName,
                            }))}
                        />
                        {selectedBarber && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    gap: 12,
                                    marginTop: 12,
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 500 }}>
                                        Tên: {selectedBarber.barberName}
                                    </div>
                                </div>
                                <Avatar
                                    size={80}
                                    src={
                                        selectedBarber.barberAvatar ||
                                        'https://via.placeholder.com/80?text=Barber'
                                    }
                                    style={{ border: '2px solid #1890ff' }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Dịch vụ sử dụng */}
                <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                        Dịch vụ sử dụng
                    </h3>

                    <ServiceProductTable
                        dataSource={selectedServices}
                        onQuantityChange={handleQuantityChange}
                        onRemoveService={handleRemoveService}
                    />

                    <div style={{ marginTop: 12 }}>
                        <ServiceSelector
                            serviceTypes={serviceTypes}
                            selectedValue={selectedServiceValue}
                            onSelect={handleSelectService}
                            placeholder='Chọn dịch vụ để thêm'
                        />
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <ProductSelector
                            productTypes={productTypes}
                            selectedValue={selectedProductValue}
                            onSelect={handleSelectProduct}
                            placeholder='Chọn sản phẩm để thêm'
                        />
                    </div>

                    {/* Tổng tiền */}
                    <div
                        style={{
                            marginTop: 16,
                            padding: '12px 16px',
                            background: '#f5f5f5',
                            borderRadius: 8,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ fontSize: 16, fontWeight: 600 }}>Tổng tiền:</span>
                        <span
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: '#ff5722',
                            }}
                        >
                            {total.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                </div>

                {/* Chọn phương thức thanh toán */}
                <div style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                        Chọn phương thức thanh toán
                    </h3>
                    <Radio.Group
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                    >
                        <Space direction='vertical' size={8}>
                            <Radio value='cash'>Tiền mặt</Radio>
                            <Radio value='bank'>Chuyển khoản ngân hàng</Radio>
                        </Space>
                    </Radio.Group>
                </div>

                {/* Nút thanh toán */}
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type='primary'
                        size='large'
                        style={{
                            background: '#4169E1',
                            borderColor: '#4169E1',
                            borderRadius: 20,
                            minWidth: 250,
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                        onClick={handlePayment}
                    >
                        Khách hàng đã thanh toán
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default InvoiceManagementBody;
