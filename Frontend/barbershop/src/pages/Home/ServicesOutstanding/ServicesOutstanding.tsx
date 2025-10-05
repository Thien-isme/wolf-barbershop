import { Card } from 'antd';
import Slider from 'react-slick';
import styles from './styles.module.scss';
import type { ServiceDTO } from '../../../types/ResponseDTOs/serviceDTO';

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
};

const { cardItem: cardItem } = styles;

const ServicesOutstanding = ({ services }: { services: ServiceDTO[] }) => {
    const servicesOutStanding = services.filter(s => s.isOutstanding);

    return (
        <div style={{ padding: '0 40px', marginBottom: 32 }}>
            <h2 style={{ marginBottom: 24 }}>Dịch vụ nổi bật</h2>
            <Slider {...sliderSettings}>
                {servicesOutStanding.map(s => (
                    <div
                        key={s.serviceId}
                        style={{ marginLeft: 12, marginRight: 12 }}
                    >
                        <Card
                            className={cardItem}
                            hoverable
                            cover={
                                <div
                                    style={{
                                        width: '100%',
                                        height: 300, // chiều cao cố định
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        background: '#f5f5f5',
                                    }}
                                >
                                    <img
                                        alt={s.serviceName}
                                        src={s.serviceImage}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover', // giữ tỷ lệ, không méo, luôn fill khung
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Card.Meta
                                style={{ padding: 0 }}
                                title={
                                    <span className={styles.title}>
                                        {s.serviceName}
                                    </span>
                                }
                                description={
                                    <span className={styles.description}>
                                        {s.description}
                                    </span>
                                }
                            />
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ServicesOutstanding;
