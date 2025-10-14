import { Select } from 'antd';
import type { ServiceTypeDTO } from '../../../../../types/ResponseDTOs/serviceTypeDTO';

interface ServiceSelectorProps {
    serviceTypes: ServiceTypeDTO[];
    selectedValue?: number;
    onSelect: (serviceId: number) => void;
    placeholder?: string;
}

const { Option, OptGroup } = Select;

export default function ServiceSelector({
    serviceTypes,
    selectedValue,
    onSelect,
    placeholder = 'Chọn dịch vụ để thêm',
}: ServiceSelectorProps) {
    return (
        <div style={{ marginBottom: 16 }}>
            <Select
                showSearch
                placeholder={placeholder}
                style={{ width: '100%' }}
                value={selectedValue}
                onChange={onSelect}
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
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <span>{service.serviceName}</span>
                                    <span style={{ color: '#888' }}>
                                        {service.price?.toLocaleString('vi-VN')}
                                        đ
                                    </span>
                                </div>
                            </Option>
                        ))}
                    </OptGroup>
                ))}
            </Select>
        </div>
    );
}
