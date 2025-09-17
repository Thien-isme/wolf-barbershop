import { Button, Typography } from 'antd';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import FeaturedServices from './FeaturedServices';
import FeaturedProducts from './FeaturedProducts';
import Branches from './Branches';
import OutstandingHair from './OutstandingHair';
import ServiceTags from './ServiceTags';
import ShortVideos from './ShortVideos';

const { Title } = Typography;

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
      <FeaturedServices />
      <FeaturedProducts />
      <Branches />
      <OutstandingHair />
      <ServiceTags />
      <ShortVideos />
    </>
  );
}

export default HomeBody;