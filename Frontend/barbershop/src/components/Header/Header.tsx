import { Layout } from 'antd';

import { useAuth } from '../../contexts/AuthContext'; // Thêm import này

import Logo from './Logo/logo';
import MenuContainer from './Menu/MenuContainer';
import RightMenu from './RightHeader/RightMenu';

import style from './styles.module.scss';
import type { UserDTO } from '../../types/ResponseDTOs/userDTO';

const BarberShopHeader = ({ login }: { login: UserDTO | null }) => {
    const { logout } = useAuth(); // Thêm hook useAuth
    const { headerContainer, flexItem } = style;
    return (
        <Layout>
            <div className={flexItem}>
                <div>
                    <div className={headerContainer}>
                        <div
                            className={flexItem}
                            style={{
                                width: '100%',
                                maxWidth: '1400px',
                            }}
                        >
                            <div className={flexItem} style={{ width: '100%' }}>
                                <div>
                                    <Logo />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <MenuContainer />
                                </div>
                                <div className={flexItem}>
                                    <RightMenu login={login} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BarberShopHeader;
