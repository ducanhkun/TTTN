import api from "./api";

export const getAppointments = async () => {
    try {
        const response = await api.get("/appointments");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
        throw new Error(error.response?.data || "Không thể lấy danh sách lịch hẹn!");
    }
};

export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post("/appointments", appointmentData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo mới lịch hẹn:", error);
        throw new Error(error.response?.data || "Không thể tạo lịch hẹn!");
    }
};

export const updateAppointment = async (appointmentId, updatedData) => {
    try {
        const response = await api.put(`/appointments/${appointmentId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật lịch hẹn:", error);
        throw new Error(error.response?.data || "Không thể cập nhật lịch hẹn!");
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        const response = await api.delete(`/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa lịch hẹn:", error);
        throw new Error(error.response?.data || "Không thể xóa lịch hẹn!");
    }
};

export const getAppointmentsByCustomerId = async (customerId) => {
    try {
        const response = await api.get(`/appointments/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách lịch hẹn theo customerId:", error);
        throw new Error(error.response?.data || "Không thể lấy danh sách lịch hẹn cho khách hàng!");
    }
};
