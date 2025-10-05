import {
    Row,
    Col,
    Card,
    Button,
    Slider,
    Typography,
    Checkbox,
    Collapse,
} from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const products = [
    {
        id: 1,
        name: '4RAU GREEN TRUCKER HAT SS2',
        price: 400000,
        img: 'https://product.hstatic.net/1000006063/product/spes_5432ce6e9b6c41209fd91e2c4cecee2f_1024x1024.jpg',
    },
    // ...thêm sản phẩm khác
];

const brands = ['Alaska', 'Aqua', 'Ariston', 'Asanzo'];
const categories = ['Hàng dự án', 'Hàng thông thường'];
const types = ['Cửa trên', 'Cửa trước/ngang', 'Máy giặt & sấy', 'Máy sấy'];
const colors = ['Beige', 'Bạc', 'Bạc sâm'];

const ProductBody = () => {
    return (
        <div style={{ padding: 24 }}>
            <Row gutter={32} align='top'>
                {/* Cột lọc bên trái */}
                <Col xs={24} sm={8} md={6} lg={5} xl={4}>
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 8,
                            padding: 16,
                            border: '1px solid #eee',
                        }}
                    >
                        <div style={{ marginBottom: 24 }}>
                            <div style={{ fontWeight: 600, marginBottom: 8 }}>
                                Khoảng giá
                            </div>
                            <Slider
                                range
                                min={0}
                                max={2000000}
                                defaultValue={[0, 2000000]}
                                tipFormatter={value =>
                                    value?.toLocaleString() + 'đ'
                                }
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 13,
                                }}
                            >
                                <span>0đ</span>
                                <span>2.000.000đ</span>
                            </div>
                        </div>
                        <Collapse ghost defaultActiveKey={['1', '2', '3', '4']}>
                            <Panel header='Thương hiệu' key='1'>
                                <Checkbox.Group
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {brands.map(b => (
                                        <Checkbox key={b} value={b}>
                                            {b}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                                <a
                                    style={{
                                        fontSize: 13,
                                        color: '#1890ff',
                                    }}
                                >
                                    Xem thêm
                                </a>
                            </Panel>
                            <Panel header='Loại hàng' key='2'>
                                <Checkbox.Group
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {categories.map(c => (
                                        <Checkbox key={c} value={c}>
                                            {c}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Panel>
                            <Panel header='Kiểu máy giặt' key='3'>
                                <Checkbox.Group
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {types.map(t => (
                                        <Checkbox key={t} value={t}>
                                            {t}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                                <a
                                    style={{
                                        fontSize: 13,
                                        color: '#1890ff',
                                    }}
                                >
                                    Xem thêm
                                </a>
                            </Panel>
                            <Panel header='Màu sắc' key='4'>
                                <Checkbox.Group
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {colors.map(c => (
                                        <Checkbox key={c} value={c}>
                                            {c}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Panel>
                        </Collapse>
                    </div>
                </Col>
                {/* Cột sản phẩm bên phải */}
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
                                <Col
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    xl={4}
                                    key={idx}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={product.name}
                                                src={product.img}
                                                style={{
                                                    width: '100%',
                                                    height: 160,
                                                    objectFit: 'contain',
                                                    padding: 12,
                                                    background: '#fff',
                                                }}
                                            />
                                        }
                                        style={{
                                            textAlign: 'center',
                                            minHeight: 320,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                        bodyStyle={{
                                            padding: 16,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 500,
                                                marginBottom: 8,
                                            }}
                                        >
                                            {product.name}
                                        </div>
                                        <div
                                            style={{
                                                color: '#f44336',
                                                fontWeight: 600,
                                                fontSize: 18,
                                                marginBottom: 12,
                                            }}
                                        >
                                            {product.price.toLocaleString()}đ
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
            </Row>
        </div>
    );
};

export default ProductBody;
