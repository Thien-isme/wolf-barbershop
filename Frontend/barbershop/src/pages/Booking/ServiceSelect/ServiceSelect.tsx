import { Card, Typography, Select, Button } from 'antd';
import type { ServiceTypeDTO } from '../../../types/ResponseDTOs/serviceTypeDTO';

const ServiceSelect = ({
    serviceTypes,
    selectedServices,
    setSelectedServices,
}: {
    serviceTypes: ServiceTypeDTO[];
    selectedServices: number[];
    setSelectedServices: (ids: number[]) => void;
}) => {
    const selectedServiceObjects = selectedServices
        .map(id =>
            serviceTypes.flatMap(t => t.services).find(s => s.serviceId === id)
        )
        .filter(Boolean);

    const totalPrice = selectedServiceObjects.reduce(
        (sum, s) => sum + (s?.price || 0),
        0
    );
    const totalDuration = selectedServiceObjects.reduce(
        (sum, s) => sum + (s?.durationMin || 0),
        0
    );

    return (
        <Card
            style={{
                background: '#222',
                border: 'none',
                marginBottom: 24,
                marginTop: 32,
            }}
            bodyStyle={{ padding: 16, position: 'relative' }}
        >
            <Typography.Title
                level={5}
                style={{ color: 'white', marginBottom: 8 }}
            >
                Chọn dịch vụ
            </Typography.Title>
            <Select
                mode='multiple'
                allowClear
                placeholder='Chọn dịch vụ'
                style={{ width: '100%', marginBottom: 16 }}
                value={selectedServices}
                onChange={setSelectedServices}
                optionLabelProp='label'
                maxTagCount={0}
                maxTagPlaceholder='Chọn dịch vụ'
            >
                {serviceTypes.map(type => (
                    <Select.OptGroup
                        key={type.serviceTypeId}
                        label={type.serviceTypeName}
                    >
                        {type.services.map(service => (
                            <Select.Option
                                key={service.serviceId}
                                value={service.serviceId}
                                label={service.serviceName}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>{service.serviceName}</span>
                                    <span style={{ fontWeight: 600 }}>
                                        {service.price}k
                                    </span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select.OptGroup>
                ))}
            </Select>
            <div>
                {selectedServices.map(id => {
                    const found = serviceTypes
                        .flatMap(t => t.services)
                        .find(s => s.serviceId === id);
                    if (!found) return null;
                    return (
                        <div
                            key={id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 8,
                                background: 'white',
                                borderRadius: 6,
                                padding: '8px 12px',
                                borderBottom: '3px solid #fff',
                                fontWeight: 700,
                            }}
                        >
                            <span
                                style={{
                                    flex: 1,
                                    color: '#111',
                                    fontWeight: 700,
                                    fontSize: 18,
                                }}
                            >
                                {found.serviceName}
                            </span>
                            <span
                                style={{
                                    marginRight: 16,
                                    color: '#111',
                                    fontWeight: 700,
                                    fontSize: 18,
                                }}
                            >
                                {found.price}k
                            </span>
                            <Button
                                danger
                                size='middle'
                                style={{
                                    background: '#d0021b',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 700,
                                    borderRadius: 12,
                                    minWidth: 56,
                                }}
                                onClick={() =>
                                    setSelectedServices(
                                        selectedServices.filter(
                                            sid => sid !== id
                                        )
                                    )
                                }
                            >
                                Xóa
                            </Button>
                        </div>
                    );
                })}
            </div>
            <div style={{ marginTop: 16 }}>
                <div
                    style={{
                        color: 'white',
                        fontStyle: 'italic',
                        fontWeight: 700,
                    }}
                >
                    Tạm tính:{' '}
                    <span style={{ fontWeight: 700 }}>
                        {' '}
                        {totalPrice.toLocaleString()} vnđ
                    </span>
                </div>
                <div
                    style={{
                        color: 'white',
                        fontStyle: 'italic',
                        fontWeight: 700,
                    }}
                >
                    Tổng tiền:{' '}
                    <span style={{ fontWeight: 700 }}>
                        {' '}
                        {totalPrice.toLocaleString()} vnđ
                    </span>
                </div>
                <div
                    style={{
                        color: 'white',
                        fontStyle: 'italic',
                        fontWeight: 700,
                    }}
                >
                    Thời lượng dự kiến:{' '}
                    <span style={{ fontWeight: 700 }}>
                        {totalDuration} Phút
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default ServiceSelect;
