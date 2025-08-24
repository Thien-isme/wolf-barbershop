import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminBarberManagement from "./pages/Admin/BarberManagement/BarberManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wolf-barbershop/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/wolf-barbershop/admin" element={<AdminDashboard />} />
        <Route path="/wolf-barbershop/admin/barber" element={<AdminBarberManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;