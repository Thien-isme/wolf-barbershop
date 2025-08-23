import { Layout, Menu, Button, Dropdown } from 'antd';
import {
  UserOutlined,
  ScissorOutlined,
  HomeOutlined,
  ShopOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  ShoppingOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const menuItems = [
  { key: 'home', icon: <HomeOutlined />, label: 'Trang chủ' },
  { key: 'booking', icon: <SolutionOutlined />, label: 'Đặt lịch' },
  { key: 'service', icon: <ScissorOutlined />, label: 'Dịch vụ' },
  { key: 'product', icon: <ShoppingOutlined />, label: 'Sản phẩm' },
  { key: 'branch', icon: <ShopOutlined />, label: 'Chi nhánh' },
  { key: 'news', icon: <ReadOutlined />, label: 'Tin tức - Sự kiện' },
];

// Dropdown menu cho tài khoản
const accountMenu = (
  <Menu
    items={[
      { key: 'register', label: <a href="/register">Đăng ký</a> },
      { key: 'login', label: <a href="/login">Đăng nhập</a> },
    ]}
  />
);

const BarberShopHeader = () => {
  const navigate = useNavigate();

  const handleMenuClick = (e : {key: string}) => {
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'booking':
        navigate('/booking');
        break;
      case 'service':
        navigate('/service');
        break;
      case 'product':
        navigate('/product');
        break;
      case 'branch':
        navigate('/branch');
        break;
      case 'news':
        navigate('/news');
      break;
      default:
        break;
    }
  };

  return (
  <Layout>
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      background: '#070707ff',
      padding: '0 40px',
      height: 90
    }}>
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          cursor: 'pointer', // Đổi con trỏ khi hover
          transition: 'transform 0.2s',
        }}
        onClick={() => navigate('/')}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img
          src="/src/assets/logo6.png"
          alt="BarberShop Logo"
          style={{
            height: 70,
            transition: 'box-shadow 0.2s',
            boxShadow: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
        />
      </div>
      {/* Menu */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: 'transparent',
            fontSize: 16,
            fontWeight: 500,
            minWidth: 0,
            width: '100%',
            justifyContent: 'center'
          }}
        />
      </div>
      {/* Account & Cart */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Dropdown overlay={accountMenu} placement="bottomRight" trigger={['click']}>
          <Button
            type="text"
            icon={<UserOutlined style={{ fontSize: 22 }} />}
            style={{ color: '#fff' }}
          >
            Tài khoản
          </Button>
        </Dropdown>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
        >
          Giỏ hàng
        </Button>
      </div>
    </Header>
  </Layout>
);
};

export default BarberShopHeader;