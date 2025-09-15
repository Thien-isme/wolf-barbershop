import React, { useState, useEffect} from 'react';
import { Card, Typography, Form } from 'antd';
import dayjs from 'dayjs';

import CustomerInfo from './CustomerInfo';
import BranchSelect from './BranchSelect';
import BarberSelect from './BarberSelect';
import ServiceSelect from './ServiceSelect';
import DateTimeSelect from './DateTimeSelect';
import VoucherNote from './VoucherNote';
import BookingButton from './BookingButton';
import type { BranchDTO } from '../../types/branchDTO';
import {getBranchs} from '../../api/branchApi';
import { getBarbersInBranch } from '../../api/barbersApi';
import type { EmployeeDTO } from '../../types/employeeDTO';
import type { EmployeeImgHairDTO } from '../../types/employeeImgHairDTO';
import { getEmployeeImgHair } from '../../api/employeeImgHairApi';
import type { ServiceTypeDTO } from '../../types/serviceTypeDTO';
import { getServices } from '../../api/serviceApi';

const { Title } = Typography;

const BookingBody: React.FC = () => {
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
  const defaultTimeSlots = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30"
  ];

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await getBranchs();
        const activeBranches = response.data.filter((branch: BranchDTO) => branch.isActive);
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
        const response = await getServices();
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
      const selectedBranchData = branches.find(b => b.branchId === selectedBranchId);
      if (selectedBranchData) {
        const slots = generateTimeSlots(selectedBranchData.timeOn, selectedBranchData.timeOff);
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



  return (
    <Card className="booking-card" style={{ maxWidth: 700, margin: '0 auto', background: '#1f1f1f', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img 
          src="https://res.cloudinary.com/duzh5dnul/image/upload/v1756147091/dj0cctqnth2gislbxliz.webp" 
          alt="Wolf Barbershop Logo" 
          style={{ width: 550, marginBottom: 16 }}
        />
        <Title level={2} style={{ color: 'white', marginBottom: 24 }}>
          Đặt lịch cắt tóc tại WOLF BarberShop
        </Title>
      </div>
      <Form form={form} layout="vertical" style={{ color: 'white' }}>
        <Typography.Text style={{ color: 'white', marginBottom: 16, display: 'block' }}>
          Quý khách vui lòng cho biết thông tin
        </Typography.Text>
        <CustomerInfo form={form} />
        <Title level={4} style={{ color: 'white', marginBottom: 16 }}>Thông tin dịch vụ</Title>
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
          timeSlots={timeSlots.length > 0 ? timeSlots : defaultTimeSlots}
        />
        <VoucherNote form={form} />
        <BookingButton />
      </Form>
    </Card>
  );
};

export default BookingBody;