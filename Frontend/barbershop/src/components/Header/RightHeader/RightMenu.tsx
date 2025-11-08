import { Menu, Button, Dropdown } from 'antd';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie'; // Thêm thư viện js-cookie
import style from './style.module.scss';
import type { UserDTO } from '../../../types/ResponseDTOs/userDTO';

import { CountProductInCart } from '../../../api/cartApi';
import { useEffect, useState } from 'react';
import type { CountProductsDTO } from '../../../types/ResponseDTOs/countProductsDTO';

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

const RightMenu = ({ userInfo }: { userInfo: UserDTO | null }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const isLoggedIn = isRefreshTokenValid();
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        if (isLoggedIn) {
            CountProductInCart()
                .then((data: CountProductsDTO) => {
                    setCartCount(data.count);
                })
                .catch(err => {
                    console.error('Lỗi khi đếm sản phẩm trong giỏ hàng:', err);
                });
        }
    }, [isLoggedIn]);

    return (
        <>
            <div className={style.cartBtn}>
                <Button
                    type='primary'
                    icon={<ShoppingCartOutlined style={{ fontSize: 32 }} />}
                    className={style.cartBtn}
                    onClick={() => navigate('/cart')}
                />
                <div className={style.cartCount}>{cartCount}</div>
            </div>
            {!isLoggedIn && (
                <Button
                    type='text'
                    //   icon={<UserOutlined style={{ fontSize: 22 }} />}
                    onClick={() => navigate('/login')}
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
                                userInfo?.avatarUrl ||
                                'https://ui-avatars.com/api/?name=' + userInfo?.fullName
                            }
                            alt='avatar'
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                            }}
                        />
                        <span style={{ color: '#fff', fontWeight: 500 }}>
                            {userInfo?.fullName}
                        </span>
                    </div>
                </Dropdown>
            )}
        </>
    );
};

export default RightMenu;
