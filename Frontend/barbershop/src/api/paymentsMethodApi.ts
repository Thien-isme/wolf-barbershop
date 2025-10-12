import api from './axios';

export const GetPaymentsMethods = async () => {
    return await api
        .get('/PaymentsMethod/GetPaymentsMethods')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
};
