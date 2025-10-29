import api from './axios.ts';

export const createInvoiceAppointed = async (data: any) => {
    const response = await api.post('/Invoice/create-invoice-appointed', data);
    return response.data;
};

export const createInvoiceNoBooking = async (data: any) => {
    const response = await api.post('/Invoice/create-invoice-no-booking', data);
    return response.data;
};
