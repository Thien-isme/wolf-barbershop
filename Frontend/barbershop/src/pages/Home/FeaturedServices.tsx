import { Card } from 'antd';
import Slider from 'react-slick';

const services = [
  { title: 'Cắt tóc nam', img: 'https://4rau.vn/concungfront/images/celeb/celeb5.webp', desc: 'Phong cách hiện đại, lịch lãm.' },
  { title: 'Tạo kiểu', img: 'https://4rau.vn/concungfront/images/artwork/art8.webp', desc: 'Thể hiện cá tính riêng.' },
  { title: 'Gội đầu thư giãn', img: 'https://storage.30shine.com/web/v4/images/nang-tam-dv/3-tu-trai-tim-den-hanh-dong.png', desc: 'Thư giãn tuyệt đối.' },
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

const FeaturedServices = () => (
  <div style={{ padding: '0 40px', marginBottom: 32 }}>
    <h2 style={{ marginBottom: 24 }}>Dịch vụ nổi bật</h2>
    <Slider {...sliderSettings}>
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
);

export default FeaturedServices;