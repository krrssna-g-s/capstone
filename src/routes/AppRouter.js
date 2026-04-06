import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import MenuPage from "../pages/MenuPage";
import ReservationsPage from "../pages/ReservationsPage";
import OrderOnlinePage from "../pages/OrderOnlinePage";
import LoginPage from "../pages/LoginPage";
import ConfirmedBooking from "../pages/ConfirmedBooking";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/reservations" element={<ReservationsPage />} />
      <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
      <Route path="/order-online" element={<OrderOnlinePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRouter;
