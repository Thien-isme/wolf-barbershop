import api from './axios'
import Cookies from 'js-cookie';

export const loginWithUsernamePassword = async (username: string, password: string) => {
    try {
        const res = await api.post('/Auth/login-username-password', { username, password });

        // console.log('Login with username/password response:', res.data.data);
        if(res.data.data != null) {
        Cookies.set("accessToken", res.data.data.accessToken); // Lưu token vào cookie
        Cookies.set("refreshToken", res.data.data.refreshToken); // Lưu refreshToken vào cookie
        Cookies.set("user", JSON.stringify(res.data.data.user)); // Lưu user vào cookie
        }
        return res.data;
    } catch (error) {
        console.error('Error logging in with username:', error);
    }   
}

export const loginWithGoogle = async (token: string) => {
    try {
        const res = await api.post('/Auth/google-login', { token });
        // console.log('Login with Google response:', res);
        Cookies.set("accessToken", res.data.data.accessToken); // Lưu token vào cookie
        Cookies.set("refreshToken", res.data.data.refreshToken); // Lưu refreshToken vào cookie
        Cookies.set("user", JSON.stringify(res.data.data.user)); // Lưu user vào cookie
        return res.data;
    } catch (error) {
        console.error('Error logging in with Google:', error);
    }
}

export const autoLogin = async (accessToken: string, refreshToken: string) => {
    try {
        console.log("accessToken: ", accessToken);
        console.log('headers: ', { Authorization: `Bearer ${accessToken}` });
        const res = await api.post(
            '/Auth/auto-login',
            {refreshToken},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        

        return res.data;
    } catch (error: any) {
        console.error('Error during auto-login:', error);
        // Kiểm tra lỗi 401
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
        throw error;
    }
};

