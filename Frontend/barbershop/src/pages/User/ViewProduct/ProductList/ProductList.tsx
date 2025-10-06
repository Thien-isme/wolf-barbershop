import { Row, Col, Card, Button } from 'antd';

import type { ProductDTO } from '../../../../types/ResponseDTOs/productDTO';

interface ProductBodyProps {
    products: ProductDTO[];
}

const ProductList = ({ products }: ProductBodyProps) => {
    return (
        <Col xs={24} sm={16} md={18} lg={19} xl={20}>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: 16,
                    background: '#fff',
                    borderRadius: 8,
                }}
            >
                <Row gutter={[24, 24]}>
                    {products.map((product, idx) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={idx}>
                            <Card
                                hoverable
                                cover={
                                    <div
                                        style={{
                                            width: '100%',
                                            height: 200, // Chiều cao cố định cho ảnh
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            background: '#fff',
                                        }}
                                    >
                                        <img
                                            alt={product.productName}
                                            src={product.productImg}
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
                                    minHeight: 350, // Chiều cao cố định cho Card
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: 350, // Thêm height cố định
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
                                        marginBottom: 8,
                                        height: 40,
                                    }}
                                >
                                    {product.productName?.slice(0, 30) +
                                        (product.productName &&
                                        product.productName.length > 30
                                            ? '...'
                                            : '')}
                                </div>
                                <div
                                    style={{
                                        color: '#f44336',
                                        fontWeight: 600,
                                        fontSize: 18,
                                        marginBottom: 12,
                                    }}
                                >
                                    {product.productPriceDTO
                                        ? (
                                              product.productPriceDTO
                                                  .discountedPrice ??
                                              product.productPriceDTO
                                                  .originalPrice
                                          ).toLocaleString('vi-VN') + 'đ'
                                        : 'Liên hệ'}
                                </div>
                                <Button
                                    type='default'
                                    style={{
                                        borderColor: '#1890ff',
                                        color: '#1890ff',
                                    }}
                                >
                                    Thêm vào giỏ
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Col>
    );
};

export default ProductList;
