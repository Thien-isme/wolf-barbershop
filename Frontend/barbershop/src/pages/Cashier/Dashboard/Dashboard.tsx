import { useEffect, useState } from 'react';
import { Row, Col, Spin, Alert, Card } from 'antd';
import {
    ShoppingOutlined,
    UserOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { MetricCard } from './MetricCard/MetricCard';
import { TopBarberCard } from './TopBarberCard/TopBarberCard';
import { RevenueChart } from './RevenueChart/RevenueChart';
import SidebarLayout from '../Sidebar/SidebarLayout';

interface DashboardData {
    revenueByDay: number[];
    totalBookings: number;
    totalCustomers: number;
    totalBarbers: number;
    totalProducts: number; // Thêm dòng này
    topBarber: { name: string; count: number };
}

// Dữ liệu mặc định
const DEFAULT_DATA: DashboardData = {
    revenueByDay: [
        5_200_000, 6_100_000, 4_800_000, 7_300_000, 8_500_000, 9_200_000, 5_900_000,
    ],
    totalBookings: 168,
    totalCustomers: 142,
    totalBarbers: 8,
    totalProducts: 45, // Thêm dòng này
    topBarber: { name: 'Barber Minh', count: 52 },
};

export const CashierDashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData>(DEFAULT_DATA);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                // Giả lập delay API gọi
                await new Promise(resolve => setTimeout(resolve, 300));

                const res = DEFAULT_DATA;
                setData(res);
            } catch (e: any) {
                setError(e.message ?? 'Lỗi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (error) return <Alert message='Lỗi' description={error} type='error' />;

    return (
        <SidebarLayout>
            <div style={{ padding: '24px' }}>
                {/* Header */}
                <Card
                    style={{
                        background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
                        color: 'white',
                        borderRadius: '8px',
                        marginBottom: '24px',
                    }}
                >
                    <h1 style={{ color: 'white', marginBottom: '8px' }}>
                        💈 Dashboard Barbershop
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                        Tuần hiện tại (11/11/2025 – 17/11/2025)
                    </p>
                </Card>

                <Spin spinning={loading} size='large'>
                    {/* Metric Cards */}
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        <Col xs={24} sm={12} lg={6}>
                            <MetricCard
                                title='Tổng Lượt Đặt Lịch Trước'
                                value={data.totalBookings}
                                icon={<ShoppingOutlined style={{ color: '#1677ff' }} />}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <MetricCard
                                title='Tổng Khách Phục Vụ'
                                value={data.totalCustomers}
                                icon={<UserOutlined style={{ color: '#52c41a' }} />}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <MetricCard
                                title='Tổng Barber'
                                value={data.totalBarbers}
                                icon={<TeamOutlined style={{ color: '#fa8c16' }} />}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <MetricCard
                                title='Tổng Sản Phẩm'
                                value={data.totalProducts}
                                icon={
                                    <ShoppingCartOutlined style={{ color: '#eb2f96' }} />
                                }
                            />
                        </Col>
                    </Row>

                    {/* Second Row - Top Barber Card */}
                    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                        <Col xs={24} sm={12} lg={6}>
                            <TopBarberCard
                                name={data.topBarber.name}
                                count={data.topBarber.count}
                            />
                        </Col>
                    </Row>

                    {/* Revenue Chart */}
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <RevenueChart data={data.revenueByDay} />
                        </Col>
                    </Row>
                </Spin>
            </div>
        </SidebarLayout>
    );
};
