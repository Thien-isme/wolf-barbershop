import { Card, Typography } from 'antd';
import Slider from 'react-slick';

const { Title } = Typography;

const products = [
  { name: 'Sáp vuốt tóc', img: 'https://product.hstatic.net/200000642007/product/1_2e2e4e7b6e8d4e7e9e7e4e7e7e_1024x1024.jpg', desc: 'Giữ nếp lâu, mùi thơm nam tính.' },
  { name: 'Dầu gội', img: 'https://product.hstatic.net/200000642007/product/2_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg', desc: 'Làm sạch da đầu, dưỡng tóc.' },
  { name: 'Lược tạo kiểu', img: 'https://product.hstatic.net/200000642007/product/3_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg', desc: 'Tạo kiểu dễ dàng.' },
];

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

const FeaturedProducts = () => (
  <div style={{ padding: '0 40px', marginBottom: 32 }}>
    <Title level={2} style={{ marginBottom: 24 }}>Sản phẩm nổi bật</Title>
    <Slider {...sliderSettings}>
      {products.map(p => (
        <div key={p.name} style={{ padding: '0 12px' }}>
          <Card
            hoverable
            cover={<img alt={p.name} src={p.img} style={{ height: 180, objectFit: 'cover' }} />}
          >
            <Card.Meta title={p.name} description={p.desc} />
          </Card>
        </div>
      ))}
    </Slider>
  </div>
);

export default FeaturedProducts;