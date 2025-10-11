import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import { useAuth } from './contexts/AuthContext'; // Thêm dòng này
import HomePage from './pages/Home/HomePage';
import BookingPage from './pages/Booking/BookingPage';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminBarberManagement from './pages/Admin/BarberManagement/BarberManagement';
import BranchManagement from './pages/Admin/BranchManagement/BranchManagement';
import LoginPage from './pages/Login/LoginPage';
import BarberShopHeader from './components/Header/Header';
import CashierProductManagement from './pages/Cashier/CashierProductManagement/CashierProductManagement';
import Footer from './components/Footer/Footer';
import { autoLogin } from './api/authApi';
import { AuthProvider } from './contexts/AuthContext';
import ProductManagement from './pages/Admin/ProductManagement/ProductManagement';
import Cookies from 'js-cookie';
import ProductPage from './pages/User/ViewProduct/ProductPage';
import {GetProductInCartsOfUser} from './api/cartApi';
import CashierDashboard from './pages/Cashier/Dashboard/Dashboard';
import AppointmentsManagement from './pages/Cashier/AppointmentsManagement/AppointmentsManagement';
const clientId =
    '136465399071-sbg4p7qhb3qc9dbv8t6qdsf3m6ud93cu.apps.googleusercontent.com';

function AppContent() {
    const { login, setLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Thêm hook này
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    useEffect(() => {
        if (accessToken && refreshToken) {
            // const decodedAccessToken: any = jwtDecode(accessToken);
            const decodedRefreshToken: any = jwtDecode(refreshToken);

            if (decodedRefreshToken.exp * 1000 > Date.now()) {
                // Token còn hạn, có thể gọi API lấy thông tin user nếu cần
                fetchUserInfo();
            } else {
                // Token hết hạn, xóa khỏi cookies
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                Cookies.remove('userId');
            }
        }

        GetProductInCartsOfUser();
    }, []);

    const fetchUserInfo = async () => {
        try {
            // Ví dụ gọi API lấy user info, truyền token lên backend
            const res = await autoLogin();
            setLogin(res.data); // cập nhật thông tin user vào state
            if (res.data.roleId === 4) {
                // Nếu là admin, chuyển hướng đến trang quản trị
                navigate('/admin');
            }

            if (res.data.roleId === 3) {
                // Nếu là admin, chuyển hướng đến trang quản trị
                navigate('/cashier');
            } else {
                // Nếu là user thường, chuyển hướng đến trang chủ
                navigate('/');
            }
        } catch (error) {
            localStorage.removeItem('token');
            setLogin(null);
        }
    };

    // Hàm kiểm tra route hiện tại
    const shouldShowHeaderFooter = () => {
        // Ẩn header & footer ở các trang admin
        // console.log(location.pathname);
        // console.log(!location.pathname.startsWith('/cashier'));
        if (
            location.pathname.startsWith('/admin') == true ||
            location.pathname.startsWith('/cashier') == true
        ) {
            return false;
        }

        return true;
        // Hoặc liệt kê các route cụ thể cần ẩn
        // const hiddenRoutes = ['/login', '/admin', '/admin/barber'];
        // return !hiddenRoutes.includes(location.pathname);
    };

    return (
        <>
            {shouldShowHeaderFooter() && <BarberShopHeader login={login} />}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route
                    path='/login'
                    element={<LoginPage setLogin={setLogin} />}
                />
                <Route path='/booking' element={<BookingPage />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/admin' element={<AdminDashboard />} />
                <Route
                    path='/admin/barber'
                    element={<AdminBarberManagement />}
                />
                <Route path='/admin/branch' element={<BranchManagement />} />
                <Route path='/admin/product' element={<ProductManagement />} />
                <Route path='/cashier' element={<CashierDashboard />} />
                <Route
                    path='/cashier/appointments'
                    element={<AppointmentsManagement />}
                />
                <Route
                    path='/cashier/product'
                    element={<CashierProductManagement />}
                />
            </Routes>
            {shouldShowHeaderFooter() && <Footer />}
        </>
    );
}

function App() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <AuthProvider>
                <BrowserRouter basename='/wolf-barbershop'>
                    <AppContent />
                </BrowserRouter>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
