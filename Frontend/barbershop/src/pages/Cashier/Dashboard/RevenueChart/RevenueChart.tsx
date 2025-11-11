import { Card } from 'antd';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    data: number[];
    height?: number; // Thêm prop height
}

const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

export const RevenueChart: React.FC<Props> = ({ data, height = 605 }) => {
    const chartData = days.map((day, index) => ({
        day,
        'Doanh thu': data[index],
    }));

    return (
        <Card style={{ borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '20px' }}>Doanh Thu Theo Ngày Trong Tuần</h3>
            <div style={{ width: '100%', height }}>
                {' '}
                {/* Thay đổi height */}
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='day' />
                        <YAxis
                            tickFormatter={value => `${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                            formatter={(value: number) =>
                                value.toLocaleString('vi-VN') + 'đ'
                            }
                        />
                        <Legend />
                        <Bar dataKey='Doanh thu' fill='#1677ff' radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
