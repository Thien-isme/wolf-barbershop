import { useEffect, useState } from 'react';
import { Table, DatePicker, Space, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import SidebarLayout from '../Sidebar/SidebarLayout';
import dayjs from 'dayjs';

import { getAppointmentFromToday } from '../../../api/appointmentApi';
import type { AppointmentDTO } from '../../../types/ResponseDTOs/appointmentDTO';
import PaymentModal from './PaymentModal/PaymentModal';

const { Title } = Typography;

export default function AppointmentsManagement() {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
    const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentFromToday();
                console.log('Lịch hẹn từ hôm nay:', data.data);
                setAppointments(data.data);
            } catch (error) {
                console.error('Lỗi khi lấy lịch hẹn:', error);
            }
        };

        fetchAppointments();
    }, []);

    const tableData = appointments.map(a => ({
        key: a.appointmentId,
        appointmentDate: a.appointmentDate,
        appointmentTime: a.appointmentTime?.slice(0, 5) ?? '',
        customerName: a.userDTO?.fullName ?? '',
        phone: a.userDTO?.phone ?? '',
        barber: a.employeeDTO?.fullName ?? '',
        services: a.serviceDTOs?.map(s => s.serviceName).join(', ') ?? '',
        status: a.status,
    }));

    const columns: ColumnsType<(typeof tableData)[0]> = [
        {
            title: 'Ngày',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
        },
        {
            title: 'Thời gian',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
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
            render: (text: string) => (
                <div style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
                    {text.split(', ').map((service, idx) => (
                        <div key={idx}>{service}</div>
                    ))}
                </div>
            ),
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
                    <Button
                        type='primary'
                        onClick={() => {
                            // Tìm lại item gốc từ appointments bằng appointmentId
                            const item = appointments.find(
                                a => a.appointmentId === record.key
                            );
                            setSelectedRecord(item);
                            setModalVisible(true);
                        }}
                    >
                        Thanh toán
                    </Button>
                    <Button danger>Huỷ</Button>
                </Space>
            ),
        },
    ];

    return (
        <SidebarLayout>
            <div style={{ padding: '24px' }}>
                <Title
                    level={2}
                    style={{
                        textAlign: 'center',
                        color: '#3873f3',
                        marginBottom: 24,
                    }}
                >
                    Quản lý lịch hẹn
                </Title>
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
                        dataSource={tableData}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000 }}
                    />
                </Space>
                <PaymentModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    record={selectedRecord}
                />
            </div>
        </SidebarLayout>
    );
}
