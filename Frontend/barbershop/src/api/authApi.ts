import api from './axios'


export const loginWithGoogle = async (token: string) => {
    try {
        const res = await api.post('/AuthController/google-login', { token });
        return res.data;
    } catch (error) {
        console.error('Error logging in with Google:', error);
    }
}





