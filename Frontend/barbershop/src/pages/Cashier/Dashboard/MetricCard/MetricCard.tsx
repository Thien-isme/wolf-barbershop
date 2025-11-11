import { Card, Statistic } from 'antd';

interface Props {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    className?: string;
    fontSize?: number; // Thêm prop này
}

export const MetricCard: React.FC<Props> = ({
    title,
    value,
    icon,
    className,
    fontSize = 24, // Giá trị mặc định
}) => (
    <Card
        className={className}
        style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            borderRadius: '8px',
        }}
    >
        <Statistic
            title={title}
            value={value}
            prefix={icon}
            valueStyle={{
                color: '#1677ff',
                fontSize: `${fontSize}px`, // Sử dụng prop
                fontWeight: 'bold',
            }}
        />
    </Card>
);
