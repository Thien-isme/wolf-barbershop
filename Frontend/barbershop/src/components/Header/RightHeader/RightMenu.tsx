import { Menu, Button, Dropdown } from 'antd';
import { useAuth } from '../../../contexts/AuthContext';
import {
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import cartBtnStyle from '../CartButton.module.scss';
import Cookies from 'js-cookie'; // Thêm thư viện js-cookie
import style from './style.module.scss';
import type { UserDTO } from '../../../types/ResponseDTOs/userDTO';

// Menu cho user đã đăng nhập
const userMenu = (logout: () => void) => (
    <Menu
        items={[
            {
                key: 'changePassword',
                icon: <UserOutlined />,
                label: 'Đổi mật khẩu',
                onClick: () => {
                    // TODO: Thêm xử lý đổi mật khẩu
                },
            },
            {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Đăng xuất',
                onClick: logout,
            },
        ]}
    />
);

function isRefreshTokenValid() {
    const token = Cookies.get('refreshToken');
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // exp là số giây, Date.now() là ms
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

const RightMenu = ({ login }: { login: UserDTO | null }) => {
    const { logout } = useAuth();
    const isLoggedIn = isRefreshTokenValid();

    return (
        <>
            <Button
                type='primary'
                icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />}
                className={cartBtnStyle.cartBtn}
            >
                Giỏ hàng
            </Button>
            {!isLoggedIn && (
                <Button
                    type='text'
                    //   icon={<UserOutlined style={{ fontSize: 22 }} />}
                    href='/wolf-barbershop/login'
                    // style={{ color: '#fff' }}
                    className={style.loginBtn}
                >
                    Đăng nhập
                </Button>
            )}
            {isLoggedIn && (
                <Dropdown
                    overlay={userMenu(logout)}
                    placement='bottomRight'
                    trigger={['click']}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={
                                login?.avatarUrl ||
                                'https://ui-avatars.com/api/?name=' +
                                    login?.fullName
                            }
                            alt='avatar'
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                            }}
                        />
                        <span style={{ color: '#fff', fontWeight: 500 }}>
                            {login?.fullName}
                        </span>
                    </div>
                </Dropdown>
            )}
        </>
    );
};

export default RightMenu;
