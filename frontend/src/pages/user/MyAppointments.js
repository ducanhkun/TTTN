import React, { useState, useEffect } from "react";
import { List, Card, Button, message, Spin } from "antd";
import { deleteAppointment } from "../../services/appointments";
import { getAppointmentsByCustomerId } from "../../services/customers";
import moment from "moment";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const customerId = localStorage.getItem("customerId"); 

    useEffect(() => {
        if (!customerId) {
            message.error("Bạn cần đăng nhập để xem lịch hẹn của mình!");
            return;
        }
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await getAppointmentsByCustomerId(customerId);
            setAppointments(data);
        } catch (error) {
            message.error("Không thể tải danh sách lịch hẹn của bạn!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (appointmentId) => {
        try {
            await deleteAppointment(appointmentId);
            message.success("Xóa lịch hẹn thành công!");
            fetchAppointments(); 
        } catch (error) {
            message.error("Xóa lịch hẹn thất bại!");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", color: "#C00000" }}>Lịch Hẹn Của Tôi</h2>
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Spin size="large" />
                </div>
            ) : (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={appointments}
                    renderItem={(appointment) => (
                        <List.Item>
                            <Card
                                title={`Dịch Vụ: ${appointment.serviceName}`}
                                extra={`Trạng Thái: ${appointment.statusName}`}
                            >
                                <p>
                                    <strong>Ngày Hẹn:</strong>{" "}
                                    {moment(appointment.scheduledDate).format("DD/MM/YYYY")}
                                </p>
                                <p>
                                    <strong>Giờ Hẹn:</strong>{" "}
                                    {moment(appointment.timeSlot, "HH:mm:ss").format("hh:mm A")}
                                </p>
                                <p>
                                    <strong>Xe:</strong> {appointment.carModel}{" "}
                                    {appointment.carVersion || ""}
                                </p>
                                <p>
                                    <strong>Biển Số:</strong> {appointment.carPlateNumber}
                                </p>
                                <p>
                                    <strong>Năm Sản Xuất:</strong> {appointment.manufactureYear}
                                </p>
                                <p>
                                    <strong>Ghi Chú:</strong> {appointment.notes || "Không có ghi chú"}
                                </p>
                                <p>
                                    <strong>Giá:</strong> {appointment.price} VND
                                </p>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => handleDelete(appointment.appointmentId)}
                                >
                                    Xóa Lịch Hẹn
                                </Button>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default MyAppointments;
