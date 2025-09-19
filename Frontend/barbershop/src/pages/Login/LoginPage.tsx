import type {LoginResponseDTO } from "../../types/ResponseDTOs/loginResponseDTO";
import LoginBody from "./LoginBody";
import { useNavigate } from "react-router-dom";
const LoginPage = ({ setLogin }: { setLogin: (login: LoginResponseDTO | null) => void }) => {
const navigate = useNavigate(); // Khởi tạo hook
  // Callback nhận response từ API login
  const handleLoginSuccess = (login: LoginResponseDTO) => {
    setLogin(login);
    localStorage.setItem("accessToken", login.accessToken); // Lưu token vào localStorage
    localStorage.setItem("refreshToken", login.refreshToken); // Lưu refreshToken vào localStorage
    localStorage.setItem("user", JSON.stringify(login.user)); // Lưu user vào localStorage
    if(login.user.roleId === 4) {
      // Nếu là admin, chuyển hướng đến trang quản trị
      navigate('/admin');
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