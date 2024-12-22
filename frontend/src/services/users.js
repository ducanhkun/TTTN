import api from "./api";

export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const addUser = async (user) => {
    const response = await api.post("/users", user);
    return response.data;
};

export const updateUser = async (userId, updatedUser) => {
    const response = await api.put(`/users/${userId}`, updatedUser);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};
// Đăng nhập người dùng
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/users/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error.message);
        throw new Error(error.response?.data?.message || "Không thể đăng nhập");
    }
};
