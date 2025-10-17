import api from './axios.ts';

export const createInvoice = async (data: any) => {
    const response = await api.post('/Invoice/create-invoice', data);
    return response.data;
};
