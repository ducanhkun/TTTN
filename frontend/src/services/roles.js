import api from "./api";

export const getRoles = async () => {
    const response = await api.get("/roles");
    return response.data;
};

export const addRole = async (role) => {
    const response = await api.post("/roles", role);
    return response.data;
};

export const updateRole = async (roleId, updatedRole) => {
    const response = await api.put(`/roles/${roleId}`, updatedRole);
    return response.data;
};

export const deleteRole = async (roleId) => {
    const response = await api.delete(`/roles/${roleId}`);
    return response.data;
};
