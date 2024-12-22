import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post("http://localhost:3306/api/customers/login", values);
            localStorage.setItem("customerId", data.customerId);
            localStorage.setItem("fullName", data.fullName);
            message.success("Đăng nhập thành công!");
            navigate("/");
            window.location.reload();
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Đăng nhập thất bại!";
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                padding: "30px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                borderRadius: "10px",
                backgroundColor: "#fff",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Title level={3} style={{ color: "#C00000" }}>Đăng Nhập</Title>
                <Text>Nhập số điện thoại và mật khẩu để tiếp tục.</Text>
            </div>

            {/* Login Form */}
            <Form layout="vertical" onFinish={handleLogin}>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại!" },
                        { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>

            {/* Register Link */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Text>Bạn chưa có tài khoản? </Text>
                <Link to="/register" style={{ color: "#C00000" }}>
                    Đăng ký ngay!
                </Link>
            </div>
        </div>
    );
};

export default Login; 