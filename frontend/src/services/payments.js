import api from "./api";

export const getPayments = async () => {
    const response = await api.get("/payments");
    return response.data;
};

export const addPayment = async (payment) => {
    const response = await api.post("/payments", payment);
    return response.data;
};

export const updatePayment = async (paymentId, updatedPayment) => {
    const response = await api.put(`/payments/${paymentId}`, updatedPayment);
    return response.data;
};

export const deletePayment = async (paymentId) => {
    const response = await api.delete(`/payments/${paymentId}`);
    return response.data;
};
