import { Menu } from 'antd';
import {
    ScissorOutlined,
    HomeOutlined,
    ShopOutlined,
    ReadOutlined,
    SolutionOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';

export const menuItems = [
    { key: '', icon: <HomeOutlined />, label: 'Trang chủ' },
    { key: 'booking', icon: <SolutionOutlined />, label: 'Đặt lịch' },
    { key: 'service', icon: <ScissorOutlined />, label: 'Dịch vụ' },
    { key: 'product', icon: <ShoppingOutlined />, label: 'Sản phẩm' },
    { key: 'branch', icon: <ShopOutlined />, label: 'Chi nhánh' },
    { key: 'news', icon: <ReadOutlined />, label: 'Tin tức - Sự kiện' },
];

export const accountMenu = (
    <Menu
        items={[
            { key: 'register', label: <a href='/register'>Đăng ký</a> },
            {
                key: 'login',
                label: <a href='/wolf-barbershop/login'>Đăng nhập</a>,
            },
        ]}
    />
);
