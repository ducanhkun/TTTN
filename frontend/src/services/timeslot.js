import api from "./api";

// Lấy tất cả khung giờ
export const getAllTimeSlots = async () => {
    try {
        const response = await api.get("/time-slots");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy tất cả khung giờ:", error);
        throw error;
    }
};

// Lấy khung giờ khả dụng theo serviceId
export const getTimeSlotsByServiceId = async (serviceId) => {
    try {
        const response = await api.get(`/time-slots/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy khung giờ cho serviceId ${serviceId}:`, error);
        throw error;
    }
};

// Thêm khung giờ mới
export const addTimeSlot = async (timeSlotData) => {
    try {
        const response = await api.post("/time-slots", timeSlotData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm khung giờ:", error);
        throw error;
    }
};

// Cập nhật khung giờ
export const updateTimeSlot = async (timeSlotId, updatedData) => {
    try {
        const response = await api.put(`/time-slots/${timeSlotId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật khung giờ ${timeSlotId}:`, error);
        throw error;
    }
};

// Xóa khung giờ
export const deleteTimeSlot = async (timeSlotId) => {
    try {
        const response = await api.delete(`/time-slots/${timeSlotId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa khung giờ ${timeSlotId}:`, error);
        throw error;
    }
};
