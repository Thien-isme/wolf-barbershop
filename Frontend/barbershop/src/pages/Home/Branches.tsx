import { Card, Row, Col, Typography, Button } from 'antd';
import { getBranchs } from '../../api/branchApi';
import { useEffect, useState } from 'react';
import type { BranchDTO } from '../../types/ResponseDTOs/branchDTO';
const { Title } = Typography;


const Branches = () => {
  const [branches, setBranches] = useState<BranchDTO[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      const res = await getBranchs();
      setBranches(Array.isArray(res.data) ? res.data.slice(0, 8) : []);
    };

    fetchBranches();
  }, []);


return (
  <div style={{ background: '#fafafa', padding: '40px 0', marginBottom: 32 }}>
    <Row gutter={32} align="middle" 
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}
    >
      <Col xs={24} md={10}>
        <Title level={2}>Khám phá hệ thống chi nhánh WOLF trên toàn quốc.</Title>
        <p>Dễ dàng tìm kiếm và trải nghiệm dịch vụ chất lượng gần nơi bạn nhất.</p>
        <p>Hotline: 1900 4407</p>
        <Button type="default" size="large">Xem thêm</Button>
      </Col>
      <Col xs={24} md={14}>
        <Row gutter={[16, 16]}>
          {branches.map((branch, idx) => (
            <Col xs={12} sm={8} md={6} key={idx}>
              <Card
                cover={<img src={branch.branchUrl} alt={`Branch ${idx + 1}`} style={{ borderRadius: 12, height: 120, objectFit: 'cover' }} />}
                bordered={false}
                style={{ boxShadow: 'none', background: 'transparent' }}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  </div>
)
};

export default Branches;