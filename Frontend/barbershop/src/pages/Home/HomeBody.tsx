import { Card, Row, Col, Button, Tag, Typography } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

// Dữ liệu mẫu
const products = [
  { name: 'Sáp vuốt tóc', img: 'https://product.hstatic.net/200000642007/product/1_2e2e4e7b6e8d4e7e9e7e4e7e7e_1024x1024.jpg', desc: 'Giữ nếp lâu, mùi thơm nam tính.' },
  { name: 'Dầu gội', img: 'https://product.hstatic.net/200000642007/product/2_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg', desc: 'Làm sạch da đầu, dưỡng tóc.' },
  { name: 'Lược tạo kiểu', img: 'https://product.hstatic.net/200000642007/product/3_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg', desc: 'Tạo kiểu dễ dàng.' },
];

const branches = [
  'https://4rau.vn/concungfront/images/celeb/celeb5.webp',
  'https://4rau.vn/concungfront/images/artwork/art8.webp',
  'https://storage.30shine.com/web/v4/images/nang-tam-dv/3-tu-trai-tim-den-hanh-dong.png',
  'https://product.hstatic.net/200000642007/product/1_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg',
  'https://product.hstatic.net/200000642007/product/2_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg',
  'https://product.hstatic.net/200000642007/product/3_2e2e4e7b6e8d4e7e9e7e4e7e7e7e7e7e_1024x1024.jpg',
  'https://storage.30shine.com/web/v4/images/nang-tam-dv/3-tu-trai-tim-den-hanh-dong.png',
  'https://4rau.vn/concungfront/images/artwork/art8.webp',
];

const hairStyles = [
  'https://4rau.vn/concungfront/images/artwork/art4.webp',
  'https://4rau.vn/concungfront/images/artwork/art5.webp',
  'https://4rau.vn/concungfront/images/artwork/art12.webp',
  'https://4rau.vn/concungfront/images/artwork/art11.webp',
  'https://4rau.vn/concungfront/images/artwork/art1.webp',
  'https://4rau.vn/concungfront/images/artwork/art9.webp',
  'https://4rau.vn/concungfront/images/artwork/art10.webp',
];

const serviceTags = [
  'Cạo mặt với khăn nóng', 'Uốn tóc', 'Ép side tóc', 'Nhuộm tóc', 'Tẩy tóc', 'Uốn giấy bạc', 'Uốn tóc premlock',
  'Nhuộm đen', 'Nhuộm nâu', "Men's haircut", 'Head wash & massage', 'Hot towel shave', 'Hair perm',
  'Side hair straightening', 'Hair dye', 'Hair bleaching', 'Foil perm', 'Premlock perm', 'Black hair dye'
];

const videos = [
  { url: 'https://www.youtube.com/embed/ScMzIvxBSi4', title: 'Video 1' },
  { url: 'https://www.youtube.com/embed/tgbNymZ7vqY', title: 'Video 2' },
];

const services = [
  { title: 'Cắt tóc nam', img: 'https://4rau.vn/concungfront/images/celeb/celeb5.webp', desc: 'Phong cách hiện đại, lịch lãm.' },
  { title: 'Tạo kiểu', img: 'https://4rau.vn/concungfront/images/artwork/art8.webp', desc: 'Thể hiện cá tính riêng.' },
  { title: 'Gội đầu thư giãn', img: 'https://storage.30shine.com/web/v4/images/nang-tam-dv/3-tu-trai-tim-den-hanh-dong.png', desc: 'Thư giãn tuyệt đối.' },
];

const sliderSettings = (slidesToShow = 3) => ({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: Math.max(1, slidesToShow - 1) } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
});

const HomeBody = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Banner */}
      <div style={{ marginBottom: 32 }}>
        <Slider autoplay {...sliderSettings(1)}>
          <div>
            <img src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951798/banner_lmlmue.webp" alt="Banner" style={{ width: '100%', height: 750, objectFit: 'cover' }} />
          </div>
          {/* Thêm các banner khác nếu muốn */}
        </Slider>
      </div>
      {/* Giới thiệu */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1>Chào mừng đến với WOLF BarberShop!</h1>
        <p>Địa chỉ làm đẹp dành cho phái mạnh, phong cách chuyên nghiệp, dịch vụ tận tâm.</p>
        <Button type="primary" size="large" onClick={() => navigate('/booking')}>Đặt lịch ngay</Button>
      </div>
      {/* Dịch vụ nổi bật */}
      <div style={{ padding: '0 40px', marginBottom: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Dịch vụ nổi bật</h2>
        <Slider {...sliderSettings(3)}>
          {services.map(s => (
            <div key={s.title} style={{ padding: '0 12px' }}>
              <Card
                hoverable
                cover={<img alt={s.title} src={s.img} style={{ height: 180, objectFit: 'cover' }} />}
              >
                <Card.Meta title={s.title} description={s.desc} />
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      {/* Các sản phẩm */}
      <div style={{ padding: '0 40px', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 24 }}>Sản phẩm nổi bật</Title>
        <Slider {...sliderSettings(3)}>
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
      {/* Các chi nhánh */}
      <div style={{ background: '#fafafa', padding: '40px 0', marginBottom: 32 }}>
        <Row gutter={32} align="middle">
          <Col xs={24} md={10}>
            <Title level={2}>Khám phá hệ thống chi nhánh WOLF trên toàn quốc.</Title>
            <p>Dễ dàng tìm kiếm và trải nghiệm dịch vụ chất lượng gần nơi bạn nhất.</p>
            <p>Hotline: 1900 4407</p>
            <Button type="default" size="large">Xem thêm</Button>
          </Col>
          <Col xs={24} md={14}>
            <Row gutter={[16, 16]}>
              {branches.map((img, idx) => (
                <Col xs={12} sm={8} md={6} key={idx}>
                  <Card
                    cover={<img src={img} alt={`Branch ${idx + 1}`} style={{ borderRadius: 12, height: 120, objectFit: 'cover' }} />}
                    bordered={false}
                    style={{ boxShadow: 'none', background: 'transparent' }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      {/* Các kiểu tóc */}
      <div style={{ padding: '0 40px', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 24 }}>Các kiểu tóc nổi bật</Title>
        <Slider {...sliderSettings(4)}>
          {hairStyles.map((img, idx) => (
            <div key={idx} style={{ padding: '0 12px' }}>
              <Card
                hoverable
                bodyStyle={{ padding: 0 }}
                bordered={false}
                style={{ background: 'transparent', boxShadow: 'none', margin: '0 6px 0' }}
                cover={<img alt={`Hair Style ${idx + 1}`} src={img} style={{ height: 400, objectFit: 'cover', borderRadius: 12}} />}
              />
              
            </div>
          ))}
        </Slider>
      </div>
      {/* Dịch vụ chạy tag */}
      <div style={{ background: '#fff', padding: '40px 0', marginBottom: 32 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>OUR SERVICE</Title>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {serviceTags.map((tag, idx) => (
            <Tag
              key={idx}
              color="red"
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
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      {/* Video ngắn */}
      <div style={{ padding: '0 40px', marginBottom: 32 }}>
        <Title level={2} style={{ marginBottom: 24 }}>Video ngắn</Title>
        <Slider {...sliderSettings(2)}>
          {videos.map((v, idx) => (
            <div key={idx} style={{ padding: '0 12px' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 12 }}>
                <iframe
                  src={v.url}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 12,
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HomeBody;