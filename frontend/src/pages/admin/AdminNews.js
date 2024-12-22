import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminNews = () => {
    const [news, setNews] = useState([]); 
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [editingNews, setEditingNews] = useState(null); 

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/news");
            setNews(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách tin tức:", error);
        }
    };

    const handleAddOrUpdateNews = async (values) => {
        try {
            const newsData = { ...values, image: imageUrl };

            if (editingNews) {
                await axios.put(`http://localhost:5000/api/news/${editingNews.newsId}`, newsData);
                message.success("Cập nhật tin tức thành công!");
            } else {
                await axios.post("http://localhost:5000/api/news", newsData);
                message.success("Thêm tin tức thành công!");
            }

            fetchNews();
            setIsModalVisible(false);
            form.resetFields();
            setImageUrl("");
            setEditingNews(null);
        } catch (error) {
            console.error("Lỗi khi thêm hoặc sửa tin tức:", error);
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleDeleteNews = async (newsId) => {
        try {
            await axios.delete(`http://localhost:5000/api/news/${newsId}`);
            message.success("Xóa tin tức thành công!");
            fetchNews();
        } catch (error) {
            console.error("Lỗi khi xóa tin tức:", error);
            message.error("Không thể xóa tin tức!");
        }
    };

    const handleUpload = (info) => {
        if (info.file.status === "done") {
            const uploadedUrl = info.file.response?.url;
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
                message.success("Tải ảnh lên thành công!");
            } else {
                message.error("Tải ảnh lên thất bại!");
            }
        } else if (info.file.status === "error") {
            message.error("Lỗi khi tải ảnh lên!");
        }
    };

    const handleEditNews = (news) => {
        setEditingNews(news);
        setImageUrl(news.image);
        form.setFieldsValue(news);
        setIsModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "newsId", key: "newsId" },
        { title: "Tiêu Đề", dataIndex: "title", key: "title" },
        { title: "Nội Dung", dataIndex: "content", key: "content", ellipsis: true },
        {
            title: "Hình Ảnh",
            dataIndex: "image",
            key: "image",
            render: (text) => (
                <img src={text || "https://via.placeholder.com/100"} alt="Hình ảnh tin tức" style={{ width: "100px", height: "auto" }} />
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }}
                        onClick={() => handleEditNews(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tin tức này không?"
                        onConfirm={() => handleDeleteNews(record.newsId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} style={{ backgroundColor: "red", color: "white" }} danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Tin Tức</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setEditingNews(null);
                    setIsModalVisible(true);
                    form.resetFields();
                    setImageUrl("");
                }}
                style={{ marginBottom: "16px" }}
            >
                Thêm Tin Tức
            </Button>
            <Table dataSource={news} columns={columns} rowKey="newsId" style={{ marginTop: "16px" }} />
            <Modal
                title={editingNews ? "Sửa Tin Tức" : "Thêm Tin Tức"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingNews(null);
                    setImageUrl("");
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdateNews} layout="vertical">
                    <Form.Item name="title" label="Tiêu Đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Nội Dung" rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="image" label="Hình Ảnh">
                        <Upload
                            name="file"
                            action="http://localhost:5000/api/upload"
                            listType="picture-card"
                            onChange={handleUpload}
                            showUploadList={false}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="Hình ảnh" style={{ width: "100%" }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminNews;
