import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    // Lấy danh sách dịch vụ
    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách dịch vụ:", error);
        }
    };

    // Thêm hoặc sửa dịch vụ
    const handleAddOrUpdateService = async (values) => {
        try {
            const serviceData = { ...values, serviceImage: imageUrl };

            if (editingService) {
                // Sửa dịch vụ
                await axios.put(`http://localhost:3306/api/services/${editingService.serviceId}`, serviceData);
                message.success("Cập nhật dịch vụ thành công!");
            } else {
                // Thêm mới dịch vụ
                await axios.post("http://localhost:3306/api/services", serviceData);
                message.success("Thêm dịch vụ thành công!");
            }

            fetchServices();
            setIsModalVisible(false);
            form.resetFields();
            setImageUrl("");
            setEditingService(null);
        } catch (error) {
            console.error("Lỗi khi thêm hoặc sửa dịch vụ:", error);
            message.error("Có lỗi xảy ra!");
        }
    };

    // Xóa dịch vụ
    const handleDeleteService = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:3306/api/services/${serviceId}`);
            message.success("Xóa dịch vụ thành công!");
            fetchServices();
        } catch (error) {
            console.error("Lỗi khi xóa dịch vụ:", error);
            message.error("Không thể xóa dịch vụ!");
        }
    };

    // Xử lý upload ảnh
    const handleUpload = (info) => {
        if (info.file.status === "done") {
            const uploadedUrl = info.file.response?.url;
            if (uploadedUrl) {
                setImageUrl(uploadedUrl);
                message.success("Tải ảnh lên thành công!");
            } else {
                message.error("Tải ảnh lên thất bại!");
            }
        }
    };

    // Hiển thị modal chỉnh sửa dịch vụ
    const handleEditService = (service) => {
        setEditingService(service);
        setImageUrl(service.serviceImage);
        form.setFieldsValue(service);
        setIsModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "serviceId", key: "serviceId" },
        { title: "Tên Dịch vụ", dataIndex: "serviceName", key: "serviceName" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (text) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text),
        },
        {
            title: "Hình Ảnh",
            dataIndex: "serviceImage",
            key: "serviceImage",
            render: (text) => (
                <img src={text} alt="Hình ảnh dịch vụ" style={{ width: "100px", height: "auto" }} />
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }} // Màu xanh lá cây
                        onClick={() => handleEditService(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa dịch vụ này không?"
                        onConfirm={() => handleDeleteService(record.serviceId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />}  style={{ backgroundColor: "red", color: "white" }} danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Dịch vụ</h2>
            <Button
                type="primary"
                onClick={() => {
                    setEditingService(null);
                    setIsModalVisible(true);
                    form.resetFields();
                    setImageUrl("");
                }}
            >
                Thêm Dịch vụ
            </Button>
            <Table dataSource={services} columns={columns} rowKey="serviceId" style={{ marginTop: "16px" }} />
            <Modal
                title={editingService ? "Sửa Dịch vụ" : "Thêm Dịch vụ"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingService(null);
                    setImageUrl("");
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdateService} layout="vertical">
                    <Form.Item name="serviceName" label="Tên Dịch vụ" rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="serviceImage" label="Hình Ảnh">
                        <Upload
                            name="file"
                            action="http://localhost:3306/api/upload"
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

export default AdminServices;
