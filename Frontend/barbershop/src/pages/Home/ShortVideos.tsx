import { Typography } from 'antd';
import Slider from 'react-slick';

const { Title } = Typography;

const videos = [
  { url: 'https://www.youtube.com/embed/ScMzIvxBSi4', title: 'Video 1' },
  { url: 'https://www.youtube.com/embed/tgbNymZ7vqY', title: 'Video 2' },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 1 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const ShortVideos = () => (
  <div style={{ padding: '0 40px', marginBottom: 32 }}>
    <Title level={2} style={{ marginBottom: 24 }}>Video ngắn</Title>
    <Slider {...sliderSettings}>
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
);

export default ShortVideos;