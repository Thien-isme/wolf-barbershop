import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/wolf-barbershop/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* Có thể thêm các Route khác ở đây */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;