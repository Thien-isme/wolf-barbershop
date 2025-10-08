import { Modal, Table, Button, Typography, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllServicesTypes } from '../../../api/serviceTypeApi';
import type { ServiceTypeDTO } from '../../../types/ResponseDTOs/serviceTypeDTO';
import { useEffect, useState } from 'react';
interface ServiceItem {
    key: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
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
        }
    };

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
                        onSelect={handleSelectService}
                        filterOption={(input, option) =>
                            (option?.children as string)
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
                <Button
                    type='default'
                    style={{
                        background: '#3873f3',
                        color: '#fff',
                        minWidth: 120,
                    }}
                >
                    Thêm sản phẩm
                </Button>
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
