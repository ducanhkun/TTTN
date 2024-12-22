import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email: values.email,
                password: values.password,
            });
            if (response.status === 200 && response.data.success) {
                message.success("Đăng nhập thành công!");
                localStorage.setItem("fullName", response.data.user.fullName);
                navigate("/admin/services");
            } else {
                message.error(response.data.message || "Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error.message || error);
            message.error("Đã xảy ra lỗi khi đăng nhập! Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Card
                style={{
                    width: "400px",
                    padding: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                }}
            >
                <Title level={3} style={{ textAlign: "center", color: "#C00000" }}>
                    Đăng nhập
                </Title>
                <Form
                    name="user_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" },
                        ]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                backgroundColor: "#C00000",
                                borderColor: "#C00000",
                                fontWeight: "bold",
                            }}
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
