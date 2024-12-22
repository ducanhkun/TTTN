import api from "./api";

// Lấy danh sách tất cả bài viết
export const getNews = async () => {
    try {
        const response = await api.get("/news");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error.message);
        throw new Error("Không thể lấy danh sách bài viết!");
    }
};

// Lấy chi tiết bài viết theo ID
export const getNewsById = async (newsId) => {
    try {
        const response = await api.get(`/news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy bài viết với ID ${newsId}:`, error.message);
        throw new Error("Không thể lấy chi tiết bài viết!");
    }
};

// Thêm bài viết mới
export const addNews = async (newsData) => {
    try {
        const response = await api.post("/news", newsData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm bài viết:", error.message);
        throw new Error("Không thể thêm bài viết!");
    }
};

// Cập nhật bài viết
export const updateNews = async (newsId, updatedNews) => {
    try {
        const response = await api.put(`/news/${newsId}`, updatedNews);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật bài viết với ID ${newsId}:`, error.message);
        throw new Error("Không thể cập nhật bài viết!");
    }
};

// Xóa bài viết
export const deleteNews = async (newsId) => {
    try {
        const response = await api.delete(`/news/${newsId}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi xóa bài viết với ID ${newsId}:`, error.message);
        throw new Error("Không thể xóa bài viết!");
    }
};
