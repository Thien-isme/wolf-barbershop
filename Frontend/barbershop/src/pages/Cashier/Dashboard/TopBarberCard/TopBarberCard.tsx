import { MetricCard } from '../MetricCard/MetricCard';
import { CrownOutlined } from '@ant-design/icons';

interface Props {
    name: string;
    count: number;
}

export const TopBarberCard: React.FC<Props> = ({ name, count }) => (
    <MetricCard
        title='Barber Được Chọn Nhiều Nhất'
        value={`${name} (${count} lần)`}
        icon={<CrownOutlined style={{ color: '#faad14' }} />}
        fontSize={22.5} // Thêm prop fontSize
    />
);
