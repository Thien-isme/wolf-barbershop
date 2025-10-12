import type { LoginResponseDTO } from '../../types/ResponseDTOs/loginResponseDTO';
import LoginBody from './LoginBody';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const LoginPage = () => {
    const navigate = useNavigate(); // Khởi tạo hook
    // Callback nhận response từ API login
    const handleLoginSuccess = (login: LoginResponseDTO) => {
        console.log('Login successful, user data:', login);
        Cookies.set('accessToken', login.accessToken); // Lưu token vào cookie
        Cookies.set('refreshToken', login.refreshToken); // Lưu refreshToken vào cookie
        Cookies.set('userId', String(login.userDTO.userId));

        // Lưu user vào localStorage
        if (login.userDTO.roleId === 4) {
            // Nếu là admin, chuyển hướng đến trang quản trị
            navigate('/admin');
        }

        if (login.userDTO.roleId === 3) {
            // Nếu là cashier, chuyển hướng đến trang cashier
            navigate('/cashier');
        } else {
            // Nếu là user thường, chuyển hướng đến trang chủ
            navigate('/');
        }
    };

    return (
        <>
            <LoginBody onLoginSuccess={handleLoginSuccess} />
        </>
    );
};

export default LoginPage;
