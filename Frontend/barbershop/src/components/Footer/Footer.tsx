import { Layout, Row, Col, Divider, Space } from 'antd';
import { FacebookFilled, InstagramFilled, MailFilled } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer = () => (
  <AntFooter style={{ background: '#222', color: '#fff', padding: '32px 0 0 0', marginTop: 48 }}>
    <Row
      align="middle"
      justify="space-between"
      style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', minHeight: 120 }}
    >
      {/* Logo ở giữa */}
      <Col>
        {/* Chèn logo của bạn vào đây */}
        <img src="https://res.cloudinary.com/duzh5dnul/image/upload/v1755951808/logo6_nqy39c.png" alt="Logo" style={{ height: 120 }} />
      </Col>
      {/* Thông tin công ty bên phải */}
      <Col style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>CÔNG TY TNHH MTV BARBERSHOP</div>
        <div>MST: 0315048848</div>
        <div>Địa chỉ trụ sở: 123 Đường ABC, Quận XYZ, TP.HCM</div>
        <div>
          Hotline:{' '}
          <a href="tel:0123456789" style={{ color: '#fff' }}>
            0123 456 789
          </a>
        </div>
        <div>
          Email:{' '}
          <a href="mailto:info@barbershop.com" style={{ color: '#fff' }}>
            info@barbershop.com
          </a>
        </div>
        <div>Thời gian làm việc: 8:00 - 21:00 (T2 - CN)</div>
        <Space style={{ marginTop: 8 }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookFilled style={{ fontSize: 22, color: '#3b5998' }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramFilled style={{ fontSize: 22, color: '#e4405f' }} />
          </a>
          <a href="mailto:info@barbershop.com">
            <MailFilled style={{ fontSize: 22, color: '#fff' }} />
          </a>
        </Space>
      </Col>
      {/* Đường dẫn nhanh */}
      <Col style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Liên kết nhanh</div>
        <div>
          <a href="/" style={{ color: '#fff' }}>
            Trang chủ
          </a>
        </div>
        <div>
          <a href="/booking" style={{ color: '#fff' }}>
            Đặt lịch
          </a>
        </div>
        <div>
          <a href="/service" style={{ color: '#fff' }}>
            Dịch vụ
          </a>
        </div>
        <div>
          <a href="/product" style={{ color: '#fff' }}>
            Sản phẩm
          </a>
        </div>
        <div>
          <a href="/branch" style={{ color: '#fff' }}>
            Chi nhánh
          </a>
        </div>
        <div>
          <a href="/news" style={{ color: '#fff' }}>
            Tin tức
          </a>
        </div>
      </Col>
    </Row>
    <Divider style={{ background: '#333', marginTop: 24, marginBottom: 0 }} />
    <div
      style={{
        padding: '12px 0',
        textAlign: 'center',
        fontSize: 14,
        color: '#bbb',
      }}
    >
      Proudly Built By BARBERSHOP TEAM. All Rights Reserved
    </div>
  </AntFooter>
);

export default Footer;