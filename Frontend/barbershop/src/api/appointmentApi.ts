import api from './axios'

export const createAppointment = async (data: any) => {
  try {
    const res = await api.post('/Appointment/create', data)
    return res.data;
    } catch (error) {
        console.error('Lỗi khi tạo lịch hẹn:', error)
        throw error;
    }
}

export const getTimeBookedOfBarber = async (barberId: number, date: string) => {
    try {
        const res = await api.get(`/Appointment/getTimeBookedOfBarber?barberId=${barberId}&appointmentDate=${date}`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy thời gian đã đặt của thợ cắt:', error);
        throw error;
    } 
}

