import { Tag, Typography } from 'antd';
import { getServices } from '../../../api/serviceApi';
import { useEffect, useState } from 'react';
import type { ServiceDTO } from '../../../types/ResponseDTOs/serviceDTO';

const { Title } = Typography;

const OurService = () => {
    const [services, setServices] = useState<ServiceDTO[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await getServices();
                setServices(res.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div
            style={{ background: '#fff', padding: '40px 0', marginBottom: 32 }}
        >
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                OUR SERVICE
            </Title>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    justifyContent: 'center',
                }}
            >
                {services.map((item, idx) => (
                    <Tag
                        key={idx}
                        color='red'
                        style={{
                            padding: '10px 24px',
                            fontSize: 16,
                            borderRadius: 24,
                            border: '1.5px solid red',
                            background: '#fff',
                            marginBottom: 8,
                            fontWeight: 500,
                        }}
                    >
                        {item.serviceName}
                    </Tag>
                ))}
            </div>
        </div>
    );
};

export default OurService;
