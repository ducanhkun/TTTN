import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const SuccessPage = ({ appointment }) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/"); 
    };

    const handlePayment = () => {
        navigate("/payment", { state: { appointment } }); 
    };

    return (
        <div style={{ textAlign: "center", padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
            <CheckCircleOutlined style={{ fontSize: "80px", color: "#52c41a" }} />
            <h2 style={{ marginTop: "20px", fontSize: "24px", color: "#000" }}>Đặt lịch thành công!</h2>
            <p style={{ marginTop: "10px", fontSize: "16px", color: "#666" }}>
                Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ lại để xác nhận lịch hẹn.
            </p>
            <div style={{ marginTop: "30px" }}>
                <Button
                    type="primary"
                    onClick={handleGoHome}
                    style={{ marginRight: "10px", backgroundColor: "#C00000", border: "none" }}
                >
                    Về Trang Chủ
                </Button>
                <Button
                    type="primary"
                    onClick={handlePayment}
                    style={{ backgroundColor: "#28a745", border: "none" }}
                >
                    Thanh Toán Luôn
                </Button>
            </div>
        </div>
    );
};

export default SuccessPage;
