import { Card, Typography } from 'antd';
import Slider from 'react-slick';
import { getAllProductsIsOutStanding } from '../../../api/productApi';
import { useEffect, useState } from 'react';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import styles from './styles.module.scss';

const { Title } = Typography;

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
};

const ProductsOutstanding = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProductsIsOutStanding();
                if (response.status === 200) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Destructuring
    const { cardItem: cardItem } = styles;

    return (
        <div style={{ padding: '0 40px', marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 24 }}>
                Sản phẩm nổi bật
            </Title>
            <Slider {...sliderSettings}>
                {products?.slice(0, products.length).map(p => (
                    <div
                        key={p.productId}
                        style={{ paddingLeft: '12px', paddingRight: '12px' }}
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
                                        alt={p.productName}
                                        src={p.productImg}
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
                                title={p.productName}
                                description={
                                    <div>
                                        <div
                                            style={{
                                                color: 'red',
                                                fontWeight: 600,
                                                marginTop: 8,
                                                fontSize: 18,
                                            }}
                                        >
                                            {p.productPriceDTO &&
                                            p.productPriceDTO.length > 0
                                                ? (
                                                      p.productPriceDTO[0]
                                                          .discountedPrice ??
                                                      p.productPriceDTO[0]
                                                          .originalPrice
                                                  ).toFixed(3) + ' ₫'
                                                : 'Liên hệ'}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 13,
                                                color: '#888',
                                            }}
                                        >
                                            {p.instruction?.slice(0, 30) +
                                                '...'}
                                        </div>
                                    </div>
                                }
                            />
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsOutstanding;
