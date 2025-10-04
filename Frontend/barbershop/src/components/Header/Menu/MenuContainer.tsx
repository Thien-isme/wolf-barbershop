import { menuItems } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

const MenuContainer = () => {
    const navigate = useNavigate();

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key);
    };

    return (
        <Menu
            theme='dark'
            mode='horizontal'
            items={menuItems}
            onClick={handleMenuClick}
            style={{
                background: 'transparent',
                fontSize: 16,
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
                borderBottom: 'none',
            }}
        />
    );
};
export default MenuContainer;
