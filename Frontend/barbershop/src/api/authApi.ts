import api from './axios'


export const loginWithGoogle = async (token: string) => {
    try {
        const res = await api.post('/AuthController/google-login', { token });
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
            '/AuthController/auto-login',
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

