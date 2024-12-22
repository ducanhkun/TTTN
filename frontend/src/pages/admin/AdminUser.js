import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách tài khoản:", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/roles");
            setRoles(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách vai trò:", error);
        }
    };

    const handleAddOrUpdateUser = async (values) => {
        try {
            if (editingUser) {
                await axios.put(`http://localhost:5000/api/users/${editingUser.userId}`, values);
                message.success("Cập nhật tài khoản thành công!");
            } else {
                await axios.post("http://localhost:5000/api/users", values);
                message.success("Thêm tài khoản thành công!");
            }

            fetchUsers();
            setIsModalVisible(false);
            form.resetFields();
            setEditingUser(null);
        } catch (error) {
            console.error("Lỗi khi thêm hoặc sửa tài khoản:", error);
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            message.success("Xóa tài khoản thành công!");
            fetchUsers();
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error);
            message.error("Không thể xóa tài khoản!");
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "userId", key: "userId" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Tên đầy đủ", dataIndex: "fullName", key: "fullName" },
        { title: "Vai trò", dataIndex: "roleId", key: "roleId" },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
            render: (password) => "*".repeat(password.length), 
        },
        {
            title: "Hành động",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }}
                        onClick={() => handleEditUser(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa tài khoản này không?"
                        onConfirm={() => handleDeleteUser(record.userId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} style={{ backgroundColor: "red", color: "white" }}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Tài khoản</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setEditingUser(null);
                    setIsModalVisible(true);
                    form.resetFields();
                }}
                style={{ marginBottom: "16px" }}
            >
                Thêm Tài khoản
            </Button>
            <Table dataSource={users} columns={columns} rowKey="userId" style={{ marginTop: "16px" }} />
            <Modal
                title={editingUser ? "Sửa Tài khoản" : "Thêm Tài khoản"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingUser(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddOrUpdateUser} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="fullName"
                        label="Tên đầy đủ"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="roleId"
                        label="Vai trò"
                        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
                    >
                        <Select>
                            {roles.map((role) => (
                                <Select.Option key={role.roleId} value={role.roleId}>
                                    {role.roleName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminUser;
