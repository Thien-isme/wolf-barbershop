import api from './axios';

export const GetUsersToCreateInvoice = async () => {
    try {
        const response = await api.get('/User/GetUsersToCreateInvoice');
        return response.data;
    } catch (error) {
        console.error('Error fetching users for invoice:', error);
        throw error;
    }
};
