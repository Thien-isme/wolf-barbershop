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
    const [modalVisible, setModalVisible] = useState<boolean>(false); // ✅ Rõ ràng type
    const [selectedRecord, setSelectedRecord] = useState<AppointmentDTO | null>(null); // ✅ Sửa type từ any thành AppointmentDTO | null

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentFromToday();
                console.log('Lịch hẹn từ hôm nay:', data.data);

                // Sắp xếp appointments theo ngày và thời gian
                const sortedAppointments = data.data.sort(
                    (a: AppointmentDTO, b: AppointmentDTO) => {
                        // So sánh theo ngày trước
                        const dateA = new Date(a.appointmentDate ?? '1970-01-01');
                        const dateB = new Date(b.appointmentDate ?? '1970-01-01');

                        if (dateA.getTime() !== dateB.getTime()) {
                            return dateA.getTime() - dateB.getTime();
                        }

                        // Nếu cùng ngày thì so sánh theo thời gian
                        const timeA = a.appointmentTime || '00:00';
                        const timeB = b.appointmentTime || '00:00';

                        return timeA.localeCompare(timeB);
                    }
                );

                setAppointments(sortedAppointments);
            } catch (error) {
                console.error('Lỗi khi lấy lịch hẹn:', error);
            }
        };

        fetchAppointments();
    }, []);

    // Function để refresh appointments - SỬA THÊM
    const fetchAppointments = async () => {
        try {
            const data = await getAppointmentFromToday();
            console.log('Lịch hẹn từ hôm nay:', data.data);

            const sortedAppointments = data.data.sort(
                (a: AppointmentDTO, b: AppointmentDTO) => {
                    const dateA = new Date(a.appointmentDate ?? '1970-01-01');
                    const dateB = new Date(b.appointmentDate ?? '1970-01-01');

                    if (dateA.getTime() !== dateB.getTime()) {
                        return dateA.getTime() - dateB.getTime();
                    }

                    const timeA = a.appointmentTime || '00:00';
                    const timeB = b.appointmentTime || '00:00';

                    return timeA.localeCompare(timeB);
                }
            );

            setAppointments(sortedAppointments);
        } catch (error) {
            console.error('Lỗi khi lấy lịch hẹn:', error);
        }
    };

    // Cập nhật tableData và thêm sort cho columns
    const tableData = appointments.map(a => ({
        key: a.appointmentId,
        appointmentDate: a.appointmentDate,
        appointmentTime: a.appointmentTime?.slice(0, 5) ?? '',
        customerName: a.userDTO?.fullName ?? '',
        phone: a.userDTO?.phone ?? '',
        barber: a.employeeDTO?.fullName ?? '',
        services: a.serviceDTOs?.map(s => s.serviceName).join(', ') ?? '',
        note: a.note ?? '',
        status: a.status,
        sortDate: new Date(a.appointmentDate ?? '1970-01-01').getTime(),
        sortTime: a.appointmentTime || '00:00',
    }));

    const columns: ColumnsType<(typeof tableData)[0]> = [
        {
            title: 'Ngày',
            dataIndex: 'appointmentDate',
            key: 'appointmentDate',
            sorter: (a, b) => a.sortDate - b.sortDate,
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend',
            render: (date: string) => {
                return dayjs(date).format('DD/MM/YYYY');
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'appointmentTime',
            key: 'appointmentTime',
            sorter: (a, b) => a.sortTime.localeCompare(b.sortTime),
            sortDirections: ['ascend', 'descend'],
            render: (time: string) => {
                return time || '--:--';
            },
        },
        {
            title: 'Tên khách',
            dataIndex: 'customerName',
            key: 'customerName',
            sorter: (a, b) => a.customerName.localeCompare(b.customerName),
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
            sorter: (a, b) => a.barber.localeCompare(b.barber),
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
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: 200,
            render: (text: string) => {
                return (
                    <div
                        style={{
                            maxWidth: '180px', // Giới hạn chiều rộng nội dung
                            wordWrap: 'break-word', // Tự động xuống dòng
                            whiteSpace: 'normal', // Cho phép xuống dòng
                            wordBreak: 'break-word', // Phá từ dài
                            lineHeight: '1.4', // Tăng khoảng cách dòng
                            padding: '4px 0', // Thêm padding
                        }}
                    >
                        {text || 'Không có'}
                    </div>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            filters: [
                { text: 'Đã đặt', value: 'BOOKED' },
                { text: 'Đã hoàn thành', value: 'COMPLETED' },
                { text: 'Đã hủy', value: 'CANCELLED' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status: string) => {
                const statusConfig = {
                    BOOKED: { text: 'Đã đặt', color: '#1890ff' },
                    COMPLETED: { text: 'Đã hoàn thành', color: '#52c41a' },
                    CANCELLED: { text: 'Đã hủy', color: '#ff4d4f' },
                };

                const config = statusConfig[status as keyof typeof statusConfig] || {
                    text: status,
                    color: '#666',
                };

                return (
                    <span
                        style={{
                            color: config.color,
                            fontWeight: '500',
                        }}
                    >
                        {config.text}
                    </span>
                );
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                const appointment = appointments.find(
                    a => a.appointmentId === record.key
                );
                const status = appointment?.status;

                if (status === 'COMPLETED') {
                    return (
                        <span
                            style={{
                                color: '#52c41a',
                                fontWeight: '500',
                                padding: '4px 8px',
                                backgroundColor: '#f6ffed',
                                border: '1px solid #b7eb8f',
                                borderRadius: '4px',
                            }}
                        >
                            Đã hoàn thành
                        </span>
                    );
                }

                if (status === 'CANCELLED') {
                    return (
                        <span
                            style={{
                                color: '#ff4d4f',
                                fontWeight: '500',
                                padding: '4px 8px',
                                backgroundColor: '#fff2f0',
                                border: '1px solid #ffccc7',
                                borderRadius: '4px',
                            }}
                        >
                            Đã hủy
                        </span>
                    );
                }

                return (
                    <Space size='middle'>
                        <Button
                            type='primary'
                            size='small'
                            onClick={() => {
                                const item = appointments.find(
                                    a => a.appointmentId === record.key
                                );
                                if (item) {
                                    // ✅ Kiểm tra null safety
                                    setSelectedRecord(item);
                                    setModalVisible(true);
                                }
                            }}
                        >
                            Thanh toán
                        </Button>
                        <Button
                            danger
                            size='small'
                            onClick={() => {
                                console.log('Hủy appointment:', record.key);
                            }}
                        >
                            Huỷ
                        </Button>
                    </Space>
                );
            },
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
                <Space direction='vertical' size='large' style={{ width: '100%' }}>
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
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `${range[0]}-${range[1]} của ${total} lịch hẹn`,
                        }}
                        scroll={{ x: 1000 }}
                        size='small'
                    />
                </Space>

                {/* SỬA CONDITIONAL RENDERING */}
                {selectedRecord && (
                    <PaymentModal
                        visible={modalVisible}
                        onClose={() => {
                            setModalVisible(false);
                            setSelectedRecord(null); // Reset selectedRecord
                        }}
                        record={selectedRecord} // Bây giờ TypeScript biết selectedRecord không null
                        onPaymentSuccess={() => {
                            fetchAppointments();
                            setModalVisible(false);
                            setSelectedRecord(null);
                        }}
                    />
                )}
            </div>
        </SidebarLayout>
    );
}
