import { Row, Col, Card, Button } from 'antd';
import type { ProductDTO } from '../../../types/ResponseDTOs/productDTO';
import styled from './styled.module.scss';

interface ProductGridProps {
    productList: ProductDTO[];
}

export default function ProductGrid({ productList }: ProductGridProps) {
    return (
        <Row gutter={[20, 20]}>
            {productList.map(item => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.productId}>
                    <Card
                        className={styled.card}
                        hoverable
                        cover={
                            <div
                                style={{
                                    width: '100%',
                                    height: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    background: '#fff',
                                }}
                            >
                                <img
                                    alt={item.productName}
                                    src={item.productImg}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                        }
                        style={{
                            textAlign: 'center',
                            minHeight: 350,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: 350,
                        }}
                        bodyStyle={{
                            padding: 16,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 500,
                                // marginBottom: 8,
                                height: 40,
                            }}
                        >
                            {item.productName?.slice(0, 30) +
                                (item.productName &&
                                item.productName.length > 30
                                    ? '...'
                                    : '')}
                        </div>
                        <div
                            style={{
                                color: '#ffb300',
                                fontWeight: 'bold',
                                fontSize: 18,
                                margin: '10px 0 5px 0',
                                fontFamily: 'Montserrat, Arial, sans-serif',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 4,
                                height: 31,
                            }}
                        >
                            {item.productPriceDTO ? (
                                item.productPriceDTO.discountedPrice !== null &&
                                item.productPriceDTO.discountedPrice !==
                                    undefined &&
                                item.productPriceDTO.discountedPrice <
                                    (item.productPriceDTO.originalPrice ??
                                        0) ? (
                                    <>
                                        <div
                                            style={{ display: 'flex', gap: 8 }}
                                        >
                                            <span
                                                style={{
                                                    color: '#888',
                                                    textDecoration:
                                                        'line-through',
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {item.productPriceDTO.originalPrice?.toLocaleString()}{' '}
                                                đ
                                            </span>
                                            <span
                                                style={{
                                                    color: '#ff5722',
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                }}
                                            >
                                                {item.productPriceDTO.discountedPrice.toLocaleString()}{' '}
                                                đ
                                            </span>
                                        </div>
                                    </>
                                ) : item.productPriceDTO.originalPrice !==
                                      null &&
                                  item.productPriceDTO.originalPrice !==
                                      undefined ? (
                                    <span>
                                        {item.productPriceDTO.originalPrice.toLocaleString()}{' '}
                                        đ
                                    </span>
                                ) : (
                                    <span>Liên hệ</span>
                                )
                            ) : (
                                <span>Liên hệ</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button
                                type='default'
                                style={{
                                    borderColor: '#1890ff',
                                    color: '#1890ff',
                                }}
                                className={styled.btnEdit}
                            >
                                Điều chỉnh
                            </Button>
                            <Button
                                type='default'
                                style={{
                                    borderColor: '#1890ff',
                                    color: '#1890ff',
                                }}
                                className={styled.btnStopBusiness}
                            >
                                Ngưng kinh doanh
                            </Button>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
