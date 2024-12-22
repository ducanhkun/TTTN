import api from "./api";

export const getAllServiceDetails = async () => {
    try {
        const response = await api.get("/service-details");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách tất cả chi tiết dịch vụ:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Không thể lấy danh sách tất cả chi tiết dịch vụ");
    }
};

export const getServiceDetails = async (serviceId) => {
    try {
        const response = await api.get(`/service-details/${serviceId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách chi tiết của dịch vụ:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Không thể lấy danh sách chi tiết của dịch vụ");
    }
};

export const addServiceDetail = async (serviceDetail) => {
    try {
        const response = await api.post("/service-details", serviceDetail);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm chi tiết dịch vụ:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Không thể thêm chi tiết dịch vụ");
    }
};

export const updateServiceDetail = async (detailId, updatedDetail) => {
    try {
        const response = await api.put(`/service-details/${detailId}`, updatedDetail);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật chi tiết dịch vụ:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Không thể cập nhật chi tiết dịch vụ");
    }
};

// Xóa chi tiết dịch vụ theo detailId
export const deleteServiceDetail = async (detailId) => {
    try {
        const response = await api.delete(`/service-details/${detailId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa chi tiết dịch vụ:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Không thể xóa chi tiết dịch vụ");
    }
};
