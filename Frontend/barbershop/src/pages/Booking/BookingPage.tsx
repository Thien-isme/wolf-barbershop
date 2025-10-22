import React, { useState, useEffect } from 'react';
import { Card, Typography, Form } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

import CustomerInfo from './CustomerInfo/CustomerInfo';
import BranchSelect from './BranchSelect/BranchSelect';
import BarberSelect from './BarberSelect/BarberSelect';
import ServiceSelect from './ServiceSelect/ServiceSelect';
import DateTimeSelect from './DateTimeSelect/DateTimeSelect';
import VoucherNote from './VoucherNote/VoucherNote';
import BookingButton from './BookingButton/BookingButton';
import type { BranchDTO } from '../../types/ResponseDTOs/branchDTO';
import { getBranchs } from '../../api/branchApi';
import { getBarbersInBranch } from '../../api/employeeApi';
import type { EmployeeDTO } from '../../types/ResponseDTOs/employeeDTO';
import type { EmployeeImgHairDTO } from '../../types/ResponseDTOs/employeeImgHairDTO';
import { getEmployeeImgHair } from '../../api/employeeImgHairApi';
import type { ServiceTypeDTO } from '../../types/ResponseDTOs/serviceTypeDTO';
import { getAllServicesTypes } from '../../api/serviceTypeApi';
import { createAppointment } from '../../api/appointmentApi';
import type { AppointmentRequestDTO } from '../../types/RequestDTOs/AppointmentRequestDTO';
import { getTimeBookedOfBarber } from '../../api/appointmentApi';

import './BookingPage.css';

const { Title } = Typography;

const BookingPage: React.FC = () => {
    const [form] = Form.useForm();
    const [branches, setBranches] = useState<BranchDTO[]>([]);
    const [barbers, setBarbers] = useState<EmployeeDTO[]>([]);
    const [employeeImgHairs, setEmployeeImgHairs] = useState<EmployeeImgHairDTO[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceTypeDTO[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setLoading(true);
                const response = await getBranchs();
                const activeBranches = response.data.filter(
                    (branch: BranchDTO) => branch.isActive
                );
                setBranches(activeBranches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await getAllServicesTypes();
                // Lọc các loại dịch vụ và các dịch vụ con đang hoạt động
                const activeServiceTypes = response.data
                    .filter((st: ServiceTypeDTO) => st.isActive)
                    .map((st: ServiceTypeDTO) => ({
                        ...st,
                        services: st.services.filter(s => s.isActive),
                    }));
                setServiceTypes(activeServiceTypes);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
        fetchServices();
    }, []);

    // Hàm tạo khung giờ từ timeOn đến timeOff
    const generateTimeSlots = (timeOn: string, timeOff: string) => {
        const slots: string[] = [];
        const startTime = dayjs(`2023-01-01 ${timeOn}`);
        const endTime = dayjs(`2023-01-01 ${timeOff}`);

        let currentTime = startTime;
        while (currentTime.isBefore(endTime)) {
            slots.push(currentTime.format('HH:mm'));
            currentTime = currentTime.add(30, 'minute');
        }

        return slots;
    };

    // Thay đổi handleBranchChange để cập nhật timeSlots
    const handleBranchChange = async (selectedBranchId: number) => {
        try {
            setLoading(true);
            const response = await getBarbersInBranch(selectedBranchId);
            setBarbers(response.data);
            setSelectedBranch(selectedBranchId);

            // Tìm branch được chọn và tạo timeSlots
            const selectedBranchData = branches.find(
                b => b.branchId === selectedBranchId
            );
            if (selectedBranchData) {
                const slots = generateTimeSlots(
                    selectedBranchData.timeOn,
                    selectedBranchData.timeOff
                );
                setTimeSlots(slots);
            }
        } catch (error) {
            console.error('Error fetching barbers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBarberChange = async (barberId: number) => {
        setSelectedBarber(barberId);
        try {
            setLoading(true);
            const res = await getEmployeeImgHair({ employeeId: barberId });
            setEmployeeImgHairs(res.data || []);
        } catch (error) {
            setEmployeeImgHairs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formValues: any) => {
        if (!formValues.phone) {
            toast.error('Vui lòng nhập số điện thoại!');
            return;
        }
        if (!formValues.name) {
            toast.error('Vui lòng nhập họ và tên!');
            return;
        }
        if (!selectedBranch) {
            toast.error('Vui lòng chọn chi nhánh!');
            return;
        }
        if (!selectedBarber) {
            toast.error('Vui lòng chọn thợ cắt!');
            return;
        }
        if (!selectedDate) {
            toast.error('Vui lòng chọn ngày!');
            return;
        }
        if (!selectedTime) {
            toast.error('Vui lòng chọn giờ!');
            return;
        }
        if (selectedServices.length === 0) {
            toast.error('Vui lòng chọn dịch vụ!');
            return;
        }

        try {
            setLoading(true);

            const bookingData: AppointmentRequestDTO = {
                phone: formValues.phone,
                fullName: formValues.name,
                barberId: selectedBarber,
                branchId: selectedBranch,
                appointmentDate: selectedDate.format('YYYY-MM-DD'),
                appointmentTime: selectedTime,
                servicesId: selectedServices,
                voucherId: formValues.voucherId,
                note: formValues.note,
            };

            console.log('Booking Data:', bookingData);
            const response = await createAppointment(bookingData);

            if (response.data) {
                toast.success('Đặt lịch thành công!');
                form.resetFields();
                setSelectedBranch(null);
                setSelectedBarber(null);
                setSelectedServices([]);
                setSelectedDate(null);
                setSelectedTime(null);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Đặt lịch thất bại. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedBarber && selectedDate) {
            const fetchBookedTimes = async () => {
                try {
                    setLoading(true);
                    const res = await getTimeBookedOfBarber(
                        selectedBarber,
                        selectedDate.format('YYYY-MM-DD')
                    );

                    const formattedTimes = Array.isArray(res.data)
                        ? res.data.map((time: string) => time.slice(0, 5)) // Giữ lại phần "HH:mm"
                        : [];

                    console.log('Booked times:', formattedTimes);
                    setBookedTimes(formattedTimes);
                } catch (error) {
                    console.error('Error fetching booked times:', error);
                } finally {
                    setLoading(false);
                    setSelectedTime(null); // Reset selected time when booked times are updated
                }
            };
            fetchBookedTimes();
        }
    }, [selectedBarber, selectedDate]);

    return (
        <>
            <Card
                className='booking-card'
                style={{
                    maxWidth: 700,
                    margin: '0 auto',
                    background: '#1f1f1f',
                    color: 'white',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <img
                        src='https://res.cloudinary.com/duzh5dnul/image/upload/v1756147091/dj0cctqnth2gislbxliz.webp'
                        alt='Wolf Barbershop Logo'
                        style={{ width: 550, marginBottom: 16 }}
                    />
                    <Title level={2} style={{ color: 'white', marginBottom: 24 }}>
                        Đặt lịch cắt tóc tại WOLF BarberShop
                    </Title>
                </div>
                <Form
                    form={form}
                    layout='vertical'
                    style={{ color: 'white' }}
                    onFinish={handleSubmit}
                >
                    <Typography.Text
                        style={{
                            color: 'white',
                            marginBottom: 16,
                            display: 'block',
                        }}
                    >
                        Quý khách vui lòng cho biết thông tin
                    </Typography.Text>
                    {/* <CustomerInfo form={form} /> */}
                    <CustomerInfo />
                    <Title level={4} style={{ color: 'white', marginBottom: 16 }}>
                        Thông tin dịch vụ
                    </Title>
                    <BranchSelect
                        branches={branches}
                        selectedBranch={selectedBranch}
                        onChange={handleBranchChange}
                    />
                    <BarberSelect
                        barbers={barbers}
                        selectedBarber={selectedBarber}
                        onChange={handleBarberChange}
                        employeeImgHairs={employeeImgHairs}
                    />
                    <ServiceSelect
                        serviceTypes={serviceTypes}
                        selectedServices={selectedServices}
                        setSelectedServices={setSelectedServices}
                    />
                    <DateTimeSelect
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        timeSlots={timeSlots}
                        disabledTimes={bookedTimes} // bookedTimes là mảng ["11:46:00", ...]
                    />
                    {/* <VoucherNote form={form} /> */}
                    <VoucherNote />
                    <BookingButton loading={loading} />
                </Form>
            </Card>
            <ToastContainer />
        </>
    );
};

export default BookingPage;
