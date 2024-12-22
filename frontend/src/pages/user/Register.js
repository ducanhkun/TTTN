import React, { useState } from "react";
import { Form, Input, Button, Typography, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/customers", values);
            message.success("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error.message);
            message.error("Đăng ký thất bại! Vui lòng thử lại.");
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
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff",
            }}
        >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Title level={3} style={{ color: "#C00000" }}>
                    Đăng Ký
                </Title>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                    Tạo tài khoản để trải nghiệm các dịch vụ tuyệt vời của chúng tôi!
                </Text>
            </div>

            {/* Form */}
            <Form layout="vertical" onFinish={handleRegister} size="middle">
                <Form.Item
                    label="Xưng hô"
                    name="salutation"
                    rules={[{ required: true, message: "Vui lòng chọn xưng hô!" }]}
                >
                    <Select placeholder="Chọn xưng hô">
                        <Option value="Ông">Ông</Option>
                        <Option value="Bà">Bà</Option>
                        <Option value="Anh">Anh</Option>
                        <Option value="Chị">Chị</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Họ và Tên"
                    name="fullName"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
                >
                    <Input
                        placeholder="Nhập họ và tên"
                        prefix={<UserOutlined style={{ color: "#C00000", fontSize: "16px" }} />}
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input
                        placeholder="Nhập email của bạn"
                        prefix={<UserOutlined style={{ color: "#C00000", fontSize: "16px" }} />}
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                    <Input
                        placeholder="Nhập số điện thoại"
                        prefix={<PhoneOutlined style={{ color: "#C00000", fontSize: "16px" }} />}
                    />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        prefix={<LockOutlined style={{ color: "#C00000", fontSize: "16px" }} />}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={{
                            backgroundColor: "#C00000",
                            border: "none",
                            fontWeight: "bold",
                            fontSize: "14px", 
                            height: "40px", 
                        }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>

            {/* Link to Login */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Text style={{ fontSize: "14px" }}>Bạn đã có tài khoản? </Text>
                <Link
                    to="/login"
                    style={{
                        color: "#C00000",
                        fontWeight: "bold",
                        fontSize: "14px",
                        textDecoration: "underline",
                    }}
                >
                    Đăng nhập ngay!
                </Link>
            </div>
        </div>
    );
};

export default Register;
