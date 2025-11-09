import api from './axios';
import type { UpdateStatusAppointmentRequest } from '../types/RequestDTOs/updateStatusAppointmentRequest';
export const createAppointment = async (data: any) => {
    try {
        const res = await api.post('/Appointment/create', data);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi tạo lịch hẹn:', error);
        throw error;
    }
};

export const getTimeBookedOfBarber = async (barberId: number, date: string) => {
    try {
        const res = await api.get(
            `/Appointment/getTimeBookedOfBarber?barberId=${barberId}&appointmentDate=${date}`
        );
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy thời gian đã đặt của thợ cắt:', error);
        throw error;
    }
};

export const getAppointmentFromToday = async () => {
    try {
        const res = await api.get('/Appointment/getAppointmentFromToday');
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy lịch hẹn từ hôm nay:', error);
        throw error;
    }
};

export const UpdateStatusAppointment = async (data: UpdateStatusAppointmentRequest) => {
    try {
        const res = await api.patch(
            `/Appointment/UpdateStatusAppointment?appointmentId=${data.appointmentId}`,
            { NewStatus: data.status }
        );
        return res.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái lịch hẹn:', error);
        throw error;
    }
};
