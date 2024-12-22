import React from "react";
import { Layout } from "antd";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const UserFooter = () => {
    return (
        <Footer
            style={{
                textAlign: "center",
                backgroundColor: "#C00000", 
                color: "white",
                padding: "20px 10px",
                display: "flex",
                flexDirection: "column", 
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    flexWrap: "wrap", 
                    marginBottom: "10px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <HomeOutlined />
                    <span>123 Đường Hai Bà Trưng, HN</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <PhoneOutlined />
                    <span>
                        <a href="tel:+84123456789" style={{ color: "white" }}>
                            +84 123 456 789
                        </a>
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <MailOutlined />
                    <span>
                        <a href="mailto:contact@hondaservice.vn" style={{ color: "white" }}>
                            contact@hondaservice.vn
                        </a>
                    </span>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    flexWrap: "wrap", 
                    marginBottom: "10px",
                }}
            >
                <a href="/about" style={{ color: "white" }}>
                    Về chúng tôi
                </a>
                <a href="/contact" style={{ color: "white" }}>
                    Liên hệ
                </a>
                <a href="/policy" style={{ color: "white" }}>
                    Chính sách bảo mật
                </a>
                <a href="/services" style={{ color: "white" }}>
                    Dịch vụ
                </a>
            </div>
            <div style={{ fontSize: "14px", marginTop: "10px" }}>
                © {new Date().getFullYear()} Honda Service. All rights reserved.
            </div>
        </Footer>
    );
};

export default UserFooter;
