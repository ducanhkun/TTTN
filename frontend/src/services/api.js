import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;
