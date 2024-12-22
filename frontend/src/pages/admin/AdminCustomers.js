import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách khách hàng:", error);
        }
    };

    const handleAddOrUpdateCustomer = async (values) => {
        try {
            if (editingCustomer) {
                // Update customer
                await axios.put(
                    `http://localhost:5000/api/customers/${editingCustomer.customerId}`,
                    values
                );
                message.success("Cập nhật khách hàng thành công!");
            } else {
                // Add new customer
                await axios.post("http://localhost:5000/api/customers", values);
                message.success("Thêm khách hàng thành công!");
            }

            fetchCustomers();
            setIsModalVisible(false);
            form.resetFields();
            setEditingCustomer(null);
        } catch (error) {
            console.error("Lỗi khi thêm hoặc cập nhật khách hàng:", error);
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
            message.success("Xóa khách hàng thành công!");
            fetchCustomers();
        } catch (error) {
            console.error("Lỗi khi xóa khách hàng:", error);
            message.error("Không thể xóa khách hàng!");
        }
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
        form.setFieldsValue(customer);
        setIsModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "customerId", key: "customerId" },
        { title: "Xưng Hô", dataIndex: "salutation", key: "salutation" },
        { title: "Họ Tên", dataIndex: "fullName", key: "fullName" },
        { title: "Số Điện Thoại", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Mật khẩu", dataIndex: "password", key: "password" },
        {
            title: "Hành động",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }}
                        onClick={() => handleEditCustomer(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa khách hàng này không?"
                        onConfirm={() => handleDeleteCustomer(record.customerId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: "red", color: "white" }}
                            danger
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Khách hàng</h2>
            <Button
                type="primary"
                onClick={() => {
                    setEditingCustomer(null);
                    setIsModalVisible(true);
                    form.resetFields();
                }}
                style={{ marginBottom: "16px" }}
            >
                <PlusOutlined /> Thêm Khách hàng
            </Button>
            <Table dataSource={customers} columns={columns} rowKey="customerId" />
            <Modal
                title={editingCustomer ? "Sửa Khách hàng" : "Thêm Khách hàng"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingCustomer(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdateCustomer} layout="vertical">
                    <Form.Item
                        name="salutation"
                        label="Xưng Hô"
                        rules={[{ required: true, message: "Vui lòng nhập xưng hô!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="Họ Tên"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số Điện Thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminCustomers;
