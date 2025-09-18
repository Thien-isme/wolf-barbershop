import type {LoginResponseDTO } from "../../types/ResponseDTOs/loginResponseDTO";
import LoginBody from "./LoginBody";

const LoginPage = ({ setLogin }: { setLogin: (login: LoginResponseDTO | null) => void }) => {

  // Callback nhận response từ API login
  const handleLoginSuccess = (login: LoginResponseDTO) => {
    setLogin(login);
    console.log('login: ', login);
    localStorage.setItem("accessToken", JSON.stringify(login.accessToken)); // Lưu token vào localStorage
    localStorage.setItem("refreshToken", JSON.stringify(login.refreshToken)); // Lưu refreshToken vào localStorage
  };

  return (
    <>
      <LoginBody onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default LoginPage;