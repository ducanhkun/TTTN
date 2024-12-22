import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminServices from "./pages/admin/AdminServices";
import AdminServicesDetail from "./pages/admin/AdminServicesDetail";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminNews from "./pages/admin/AdminNews";
import AdminUser from "./pages/admin/AdminUser";
import LoginAdmin from "./pages/admin/Login";

// Import User components
import UserLayout from "./components/UserLayout"; 
import Home from "./pages/user/Home"; 
import ServiceDetail from "./pages/user/ServiceDetail"; 
import Booking from "./pages/user/Booking";
import Login from "./pages/user/Login"; 
import Register from "./pages/user/Register"; 
import SuccessPage from "./pages/user/SuccessPage"; 
import MyAppointments from "./pages/user/MyAppointments";
import PaymentPage from "./pages/user/PaymentPage";
import ServicePage from "./pages/user/ServicePage";
import NewsPage from "./pages/user/NewsPage";
import AboutPage from "./pages/user/AboutPage";
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Routes Admin */}
                <Route path="/loginadmin" element={<LoginAdmin />} /> 
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="services" element={<AdminServices />} />
                    <Route path="services-detail" element={<AdminServicesDetail />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="users" element={<AdminUser />} />
                    <Route path="news" element={<AdminNews />} />
                </Route>

                {/* Routes User */}
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="services/:serviceId" element={<ServiceDetail />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="success" element={<SuccessPage />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="servicespage" element={<ServicePage />} />
                    <Route path="/newspage" element={<NewsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {/* Authentication Routes */}
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} /> 
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
