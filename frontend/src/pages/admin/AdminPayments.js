import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import axios from "axios";

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/payments");
            setPayments(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách thanh toán:", error);
        }
    };

    const columns = [
        { title: "ID Thanh Toán", dataIndex: "paymentId", key: "paymentId" },
        { title: "Lịch Hẹn", dataIndex: "appointmentId", key: "appointmentId" },
        { title: "Ngày Thanh Toán", dataIndex: "paymentDate", key: "paymentDate" },
        { title: "Số Tiền", dataIndex: "amount", key: "amount" },
        { title: "Phương Thức", dataIndex: "paymentMethod", key: "paymentMethod" },
        { title: "Trạng Thái", dataIndex: "paymentStatus", key: "paymentStatus",
          render: (paymentStatus) => (
              <Tag color={paymentStatus === "paid" ? "green" : paymentStatus === "pending" ? "orange" : "red"}>
                  {paymentStatus}
              </Tag>
          ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Thanh Toán</h2>
            <Table dataSource={payments} columns={columns} rowKey="paymentId" />
        </div>
    );
};

export default AdminPayments;
