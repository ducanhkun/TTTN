import React from "react";
import { Card } from "antd";

const PaymentPage = () => {
    const qrCodeImageURL = "./Img/qr.png"; 
    const bankInfo = {
        bankName: "Ngân hàng Vietcombank",
        accountNumber: "123456789",
        accountHolder: "Dao Manh Duc Anh",
        note: "Thanh toan _tendichvu_ va id _dichvu_",
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
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    padding: "20px",
                    width: "400px", 
                }}
            >
                <h3 style={{ marginBottom: "20px", color: "#C00000" }}>Quét mã QR để thanh toán</h3>
                <img
                    src={qrCodeImageURL}
                    alt="QR Code"
                    style={{
                        width: "250px", 
                        height: "250px",
                        objectFit: "contain",
                        marginBottom: "20px", 
                        borderRadius: "8px",
                    }}
                />
                <h4 style={{ color: "#333", marginBottom: "10px" }}>Thông tin chuyển khoản</h4>
                <p>
                    <strong>Ngân hàng:</strong> {bankInfo.bankName}
                </p>
                <p>
                    <strong>Số tài khoản:</strong> {bankInfo.accountNumber}
                </p>
                <p>
                    <strong>Chủ tài khoản:</strong> {bankInfo.accountHolder}
                </p>
                <p>
                    <strong>Nội dung chuyển khoản:</strong> {bankInfo.note}
                </p>
            </Card>
        </div>
    );
};

export default PaymentPage;
