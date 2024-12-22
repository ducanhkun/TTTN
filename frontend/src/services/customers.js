import api from "./api";

export const getCustomers = async () => {
    const response = await api.get("/customers");
    return response.data;
};

export const addCustomer = async (customer) => {
    const response = await api.post("/customers", customer);
    return response.data;
};

export const updateCustomer = async (customerId, updatedCustomer) => {
    const response = await api.put(`/customers/${customerId}`, updatedCustomer);
    return response.data;
};

export const deleteCustomer = async (customerId) => {
    const response = await api.delete(`/customers/${customerId}`);
    return response.data;
};

export const loginCustomer = async (credentials) => {
    const response = await api.post("/customers/login", credentials);
    return response.data; 
};

export const getAppointmentsByCustomerId = async (customerId) => {
    try {
        const response = await api.get(`/customers/${customerId}/appointments`);
        return response.data; 
    } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn của khách hàng:", error.message);
        throw new Error(error.response?.data || "Không thể lấy lịch hẹn!");
    }
};
