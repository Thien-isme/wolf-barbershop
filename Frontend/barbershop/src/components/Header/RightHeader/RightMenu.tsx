import { Layout, Menu, Button, Dropdown } from 'antd';
import { useAuth } from '../../../contexts/AuthContext'; // Thêm import này
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined  // Thêm icon này
} from '@ant-design/icons';

import cartBtnStyle from '../CartButton.module.scss';


// Dropdown menu cho tài khoản
const accountMenu = (
  <Menu
    items={[
      { key: 'register', label: <a href="/register">Đăng ký</a> },
      { key: 'login', label: <a href="/wolf-barbershop/login">Đăng nhập</a> },
    ]}
  />
);

// Thêm menu cho user đã đăng nhập
const userMenu = (logout: () => void) => (
  <Menu
    items={[
      {
        key: 'changePassword',
        icon: <UserOutlined />,
        label: 'Đổi mật khẩu',
        onClick: () => {
          // TODO: Thêm xử lý đổi mật khẩu
        }
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Đăng xuất',
        onClick: logout
      }
    ]}
  />
);



const RightMenu = () => {
    const { logout } = useAuth(); // Thêm hook useAuth
    return (
        <>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
          className={cartBtnStyle.cartBtn}
        >
          Giỏ hàng
        </Button>
          <Dropdown overlay={userMenu(logout)} placement="bottomRight" trigger={['click']}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              cursor: 'pointer' 
            }}>
              <img
                src={"https://ui-avatars.com/api/?name="}
                alt="avatar"
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
              <span style={{ color: '#fff', fontWeight: 500 }}>Hello</span>
            </div>
          </Dropdown>
        
    </>
  )
}

export default RightMenu;