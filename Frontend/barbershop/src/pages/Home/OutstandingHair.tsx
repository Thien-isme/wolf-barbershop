import { Card, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { getHairIsOutstanding } from '../../api/employeeImgHairApi';
import type {EmployeeImgHairDTO} from '../../types/ResponseDTOs/employeeImgHairDTO';

const { Title } = Typography;



const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const OutstandingHair = () => {
  const [outstandingHair, setOutstandingHair] = useState<EmployeeImgHairDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHairIsOutstanding();
      setOutstandingHair(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '0 40px', marginBottom: 32 }}>
      <Title level={2} style={{ marginBottom: 24 }}>Các kiểu tóc nổi bật</Title>
      <Slider {...sliderSettings}>
        {outstandingHair.map((item, idx) => (
          <div key={idx} style={{ padding: '0 12px' }}>
            <Card
              hoverable
              bodyStyle={{ padding: 0 }}
              bordered={false}
              style={{ background: 'transparent', boxShadow: 'none', margin: '0 6px 0' }}
              cover={<img alt={`Hair Style ${idx + 1}`} src={item.imgUrl} style={{ height: 400, objectFit: 'cover', borderRadius: 12}} />}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OutstandingHair;