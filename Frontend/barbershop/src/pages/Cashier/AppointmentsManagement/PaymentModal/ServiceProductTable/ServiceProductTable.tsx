import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ServiceItem {
    key: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
    productId?: number;
    sizeName?: string;
}

interface ServiceProductTableProps {
    dataSource: ServiceItem[];
    onQuantityChange: (key: number, newQuantity: number) => void;
    onRemoveService: (key: number) => void;
}

export default function ServiceProductTable({
    dataSource,
    onQuantityChange,
    onRemoveService,
}: ServiceProductTableProps) {
    const columns: ColumnsType<ServiceItem> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên dịch vụ/sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    {text}
                    {record.sizeName && (
                        <span style={{ color: '#888' }}>
                            {' '}
                            ({record.sizeName})
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            width: 60,
            align: 'center',
            render: type => (
                <span
                    style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: type === 'DV' ? '#e6f7ff' : '#fff2e6',
                        color: type === 'DV' ? '#1677ff' : '#ff6600',
                        fontSize: '12px',
                    }}
                >
                    {type}
                </span>
            ),
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 80,
            align: 'center',
            render: (quantity, record) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                    }}
                >
                    <Button
                        size='small'
                        onClick={() =>
                            onQuantityChange(record.key, quantity - 1)
                        }
                        disabled={quantity <= 1}
                    >
                        -
                    </Button>
                    <span style={{ minWidth: 20, textAlign: 'center' }}>
                        {quantity}
                    </span>
                    <Button
                        size='small'
                        onClick={() =>
                            onQuantityChange(record.key, quantity + 1)
                        }
                    >
                        +
                    </Button>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: 100,
            align: 'right',
            render: (price: number) => `${price.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Thành tiền',
            key: 'total',
            width: 100,
            align: 'right',
            render: (_, record) =>
                `${(record.price * record.quantity).toLocaleString('vi-VN')}đ`,
        },
        {
            title: '',
            key: 'action',
            width: 60,
            align: 'center',
            render: (_, item) => (
                <Button
                    danger
                    size='small'
                    onClick={() => onRemoveService(item.key)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div style={{ marginBottom: 16 }}>
            <h4>Danh sách dịch vụ & sản phẩm</h4>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size='small'
                bordered
                scroll={{ y: 200 }}
            />
        </div>
    );
}
