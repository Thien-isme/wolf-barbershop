import { Tag, Typography } from 'antd';

import type { ServiceDTO } from '../../../types/ResponseDTOs/serviceDTO';
import styles from './styles.module.scss';
const { Title } = Typography;

const OurService = ({ services }: { services: ServiceDTO[] }) => {
    return (
        <>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                OUR SERVICE
            </Title>
            <div className={styles.flexCenter}>
                <div className={styles.marquee}>
                    <div className={styles.marqueeContent}>
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
            </div>

            <div className={styles.flexCenter}>
                <div className={styles.marquee2}>
                    <div className={styles.marqueeContentReverse}>
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
            </div>

            <div className={styles.flexCenter}>
                <div className={styles.marquee}>
                    <div className={styles.marqueeContent}>
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
            </div>
        </>
    );
};

export default OurService;
