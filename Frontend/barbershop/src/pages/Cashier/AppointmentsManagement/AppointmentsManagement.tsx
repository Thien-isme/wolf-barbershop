import { useState } from 'react';
import { Table, DatePicker, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import SidebarLayout from '../Sidebar/SidebarLayout';
import dayjs from 'dayjs';

interface AppointmentData {
    key: string;
    time: string;
    customerName: string;
    phone: string;
    barber: string;
    services: string;
    status: string;
}

export default function AppointmentsManagement() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

    const columns: ColumnsType<AppointmentData> = [
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Tên khách',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'SĐT khách',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Barber',
            dataIndex: 'barber',
            key: 'barber',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'services',
            key: 'services',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Button type='primary'>Xác nhận</Button>
                    <Button danger>Huỷ</Button>
                </Space>
            ),
        },
    ];

    return (
        <SidebarLayout>
            <div style={{ padding: '24px' }}>
                <Space
                    direction='vertical'
                    size='large'
                    style={{ width: '100%' }}
                >
                    <Space>
                        <span>Chọn thời gian:</span>
                        <DatePicker
                            value={selectedDate}
                            onChange={date => setSelectedDate(date || dayjs())}
                            format='DD/MM/YYYY'
                        />
                    </Space>

                    <Table
                        columns={columns}
                        // data sẽ được truyền vào đây
                        dataSource={[]}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000 }}
                    />
                </Space>
            </div>
        </SidebarLayout>
    );
}
