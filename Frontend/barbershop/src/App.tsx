import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminBarberManagement from "./pages/Admin/BarberManagement/BarberManagement";
import BranchManagement from "./pages/Admin/BranchManagement/BranchManagement";
function App() {
  return (
    <BrowserRouter basename="/wolf-barbershop">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/barber" element={<AdminBarberManagement />} />
        <Route path="/admin/branch" element={<BranchManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;