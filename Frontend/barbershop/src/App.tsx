import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode
import HomePage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminBarberManagement from "./pages/Admin/BarberManagement/BarberManagement";
import BranchManagement from "./pages/Admin/BranchManagement/BranchManagement";
import LoginPage from "./pages/Login/LoginPage";
import BarberShopHeader from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import type { LoginResponseDTO } from "./types/ResponseDTOs/loginResponseDTO";
const clientId = "136465399071-sbg4p7qhb3qc9dbv8t6qdsf3m6ud93cu.apps.googleusercontent.com";

function App() {
  const [login, setLogin] = useState<LoginResponseDTO | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Kiểm tra hạn token (exp là số giây từ epoch)
        if (decoded.exp * 1000 > Date.now()) {
          // Token còn hạn, có thể gọi API lấy thông tin user nếu cần
          // setLogin(userInfoFromTokenOrAPI);
          console.log('Decoded token: ', decoded);
        } else {
          // Token hết hạn, xóa khỏi localStorage
          localStorage.removeItem("token");
        }
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter basename="/wolf-barbershop">
        <BarberShopHeader login={login} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setLogin={setLogin} />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/barber" element={<AdminBarberManagement />} />
          <Route path="/admin/branch" element={<BranchManagement />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;