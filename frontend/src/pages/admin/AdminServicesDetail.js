import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, Popconfirm, message, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminServicesDetail = () => {
    const [serviceDetails, setServiceDetails] = useState([]);
    const [services, setServices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [editingDetail, setEditingDetail] = useState(null);

    useEffect(() => {
        fetchServiceDetails();
        fetchServices();
    }, []);

    // Lấy danh sách chi tiết dịch vụ
    const fetchServiceDetails = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/service-details");
            setServiceDetails(response.data.data); 
        } catch (error) {
            console.error("Lỗi khi tải chi tiết dịch vụ:", error);
            message.error("Không thể tải chi tiết dịch vụ.");
        }
    };

    // Lấy danh sách dịch vụ
    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách dịch vụ:", error);
            message.error("Không thể tải danh sách dịch vụ.");
        }
    };

    // Thêm hoặc sửa chi tiết dịch vụ
    const handleAddOrUpdateServiceDetail = async (values) => {
        const detailData = { ...values, stepImage: imageUrl };

        try {
            if (editingDetail) {
                await axios.put(`http://localhost:3306/api/service-details/${editingDetail.detailId}`, detailData);
                message.success("Cập nhật chi tiết dịch vụ thành công!");
            } else {
                await axios.post("http://localhost:3306/api/service-details", detailData);
                message.success("Thêm chi tiết dịch vụ thành công!");
            }
            fetchServiceDetails();
            closeModal();
        } catch (error) {
            console.error("Lỗi khi lưu chi tiết dịch vụ:", error);
            message.error("Không thể lưu chi tiết dịch vụ.");
        }
    };

    // Xóa chi tiết dịch vụ
    const handleDeleteServiceDetail = async (detailId) => {
        try {
            await axios.delete(`http://localhost:3306/api/service-details/${detailId}`);
            message.success("Xóa chi tiết dịch vụ thành công!");
            fetchServiceDetails();
        } catch (error) {
            console.error("Lỗi khi xóa chi tiết dịch vụ:", error);
            message.error("Không thể xóa chi tiết dịch vụ.");
        }
    };

    // Mở modal chỉnh sửa
    const handleEditDetail = (detail) => {
        setEditingDetail(detail);
        setImageUrl(detail.stepImage);
        form.setFieldsValue(detail);
        setIsModalVisible(true);
    };

    // Đóng modal
    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingDetail(null);
        setImageUrl("");
    };

    // Cột của bảng
    const columns = [
        { title: "ID", dataIndex: "detailId", key: "detailId" },
        {
            title: "Tên dịch vụ",
            dataIndex: "serviceId",
            key: "serviceName",
            render: (serviceId) => {
                const service = services.find((service) => service.serviceId === serviceId);
                return service ? service.serviceName : "Dịch vụ không tồn tại";
            },
        },
        { title: "Thứ tự bước", dataIndex: "stepOrder", key: "stepOrder" },
        { title: "Mô tả bước", dataIndex: "stepDescription", key: "stepDescription" },
        {
            title: "Hình ảnh",
            dataIndex: "stepImage",
            key: "stepImage",
            render: (text) => (text ? <img src={text} alt="Hình ảnh bước" style={{ width: "100px" }} /> : "N/A"),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }}
                        onClick={() => handleEditDetail(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa chi tiết này không?"
                        onConfirm={() => handleDeleteServiceDetail(record.detailId)}
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
            <h2>Quản lý Chi tiết Dịch vụ</h2>
            <Button
                type="primary"
                onClick={() => {
                    setEditingDetail(null);
                    setIsModalVisible(true);
                    form.resetFields();
                    setImageUrl("");
                }}
                style={{ marginBottom: "16px" }}
            >
                Thêm Chi tiết
            </Button>
            <Table
                dataSource={serviceDetails}
                columns={columns}
                rowKey="detailId"
                style={{ marginTop: "16px" }}
            />
            <Modal
                title={editingDetail ? "Sửa Chi tiết Dịch vụ" : "Thêm Chi tiết Dịch vụ"}
                open={isModalVisible}
                onCancel={closeModal}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdateServiceDetail} layout="vertical">
                    <Form.Item
                        name="serviceId"
                        label="Dịch vụ"
                        rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
                    >
                        <Select placeholder="Chọn dịch vụ">
                            {services.map((service) => (
                                <Select.Option key={service.serviceId} value={service.serviceId}>
                                    {service.serviceName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="stepOrder"
                        label="Thứ tự bước"
                        rules={[{ required: true, message: "Vui lòng nhập thứ tự bước!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="stepDescription"
                        label="Mô tả bước"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả bước!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="stepImage" label="Hình ảnh">
                        <Upload
                            name="file"
                            action="http://localhost:3306/api/upload"
                            listType="picture-card"
                            showUploadList={false}
                            onChange={(info) => {
                                if (info.file.status === "done") {
                                    const uploadedUrl = info.file.response?.url;
                                    if (uploadedUrl) {
                                        setImageUrl(uploadedUrl);
                                        message.success("Tải ảnh lên thành công!");
                                    } else {
                                        message.error("Tải ảnh lên thất bại!");
                                    }
                                }
                            }}
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

export default AdminServicesDetail;
