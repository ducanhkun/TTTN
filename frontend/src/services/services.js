import api from "./api";

// Lấy danh sách tất cả dịch vụ
export const getServices = async () => {
    const response = await api.get("/services");
    return response.data;
};

// Lấy chi tiết dịch vụ theo serviceId
export const getServiceDetails = async (serviceId) => {
    const response = await api.get(`/services/details/${serviceId}`);
    return response.data;
};

// Thêm một dịch vụ mới
export const addService = async (service) => {
    const response = await api.post("/services", service);
    return response.data;
};

// Sửa một dịch vụ
export const updateService = async (serviceId, updatedService) => {
    const response = await api.put(`/services/${serviceId}`, updatedService);
    return response.data;
};

// Xóa một dịch vụ
export const deleteService = async (serviceId) => {
    const response = await api.delete(`/services/${serviceId}`);
    return response.data;
};
