import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminBarberManagement from "./pages/Admin/BarberManagement/BarberManagement";
import BranchManagement from "./pages/Admin/BranchManagement/BranchManagement";
import LoginPage from "./pages/Login/LoginPage";

const clientId = "136465399071-sbg4p7qhb3qc9dbv8t6qdsf3m6ud93cu.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter basename="/wolf-barbershop">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/barber" element={<AdminBarberManagement />} />
          <Route path="/admin/branch" element={<BranchManagement />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;