import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Popconfirm, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [statuses] = useState([
        { value: "Chờ xác nhận" },
        { value: "Đã xác nhận" },
        { value: "Đang sửa chữa"},
        { value:"Đã hoàn thành"},
        { value: "Đã hủy"},
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAppointments();
        fetchServices();
        fetchTimeSlots();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/appointments");
            setAppointments(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách lịch hẹn:", error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách dịch vụ:", error);
        }
    };

    const fetchTimeSlots = async () => {
        try {
            const response = await axios.get("http://localhost:3306/api/time-slots");
            setTimeSlots(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách khung giờ:", error);
        }
    };

    const handleAddOrUpdateAppointment = async (values) => {
        try {
            const appointmentData = {
                ...values,
                scheduledDate: values.scheduledDate.format("YYYY-MM-DD"),
            };

            if (editingAppointment) {
                await axios.put(
                    `http://localhost:3306/api/appointments/${editingAppointment.appointmentId}`,
                    appointmentData
                );
                message.success("Cập nhật lịch hẹn thành công!");
            } else {
                await axios.post("http://localhost:3306/api/appointments", appointmentData);
                message.success("Thêm lịch hẹn thành công!");
            }

            fetchAppointments();
            setIsModalVisible(false);
            form.resetFields();
            setEditingAppointment(null);
        } catch (error) {
            console.error("Lỗi khi thêm hoặc cập nhật lịch hẹn:", error);
            message.error("Có lỗi xảy ra khi lưu lịch hẹn!");
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await axios.delete(`http://localhost:3306/api/appointments/${appointmentId}`);
            message.success("Xóa lịch hẹn thành công!");
            fetchAppointments();
        } catch (error) {
            console.error("Lỗi khi xóa lịch hẹn:", error);
            message.error("Không thể xóa lịch hẹn!");
        }
    };

    const handleEditAppointment = (appointment) => {
        setEditingAppointment(appointment);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...appointment,
            statusName: appointment.statusName || statuses.find((status) => status.label === appointment.statusName)?.value,
            scheduledDate: moment(appointment.scheduledDate),
        });        
    };

    const columns = [
        { title: "ID Lịch Hẹn", dataIndex: "appointmentId", key: "appointmentId" },
        { title: "ID Khách Hàng", dataIndex: "customerId", key: "customerId" },
        { title: "Dịch Vụ", dataIndex: "serviceName", key: "serviceName" },
        { title: "Giá Dịch Vụ", dataIndex: "price", key: "price", render: (text) => `${text} VND` },
        {
            title: "Ngày Hẹn",
            dataIndex: "scheduledDate",
            key: "scheduledDate",
            render: (date) => moment(date).format("DD/MM/YYYY"),
        },
        {
            title: "Thời Gian",
            dataIndex: "timeSlot",
            key: "timeSlot",
            render: (timeSlot) => moment(timeSlot, "HH:mm:ss").format("hh:mm A"),
        },
        {
            title: "Trạng Thái",
            dataIndex: "statusName",
            key: "statusName",
            render: (statusName) => (
                <Tag color={statusName === "Pending" ? "orange" : statusName === "Confirmed" ? "green" : "red"}>
                    {statusName}
                </Tag>
            ),
        },
        { title: "Mô Hình Xe", dataIndex: "carModel", key: "carModel" },
        { title: "Phiên Bản Xe", dataIndex: "carVersion", key: "carVersion" },
        { title: "Biển Số Xe", dataIndex: "carPlateNumber", key: "carPlateNumber" },
        {
            title: "Hành Động",
            key: "actions",
            render: (text, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        icon={<EditOutlined />}
                        style={{ backgroundColor: "#52c41a", color: "white" }}
                        onClick={() => handleEditAppointment(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa lịch hẹn này không?"
                        onConfirm={() => handleDeleteAppointment(record.appointmentId)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} style={{ backgroundColor: "red", color: "white" }} danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý Lịch Hẹn</h2>
            <Button
                type="primary"
                onClick={() => {
                    setEditingAppointment(null);
                    setIsModalVisible(true);
                    form.resetFields();
                }}
                style={{ marginBottom: "16px" }}
            >
                Thêm Lịch Hẹn
            </Button>
            <Table dataSource={appointments} columns={columns} rowKey="appointmentId" />

            <Modal
                title={editingAppointment ? "Sửa Lịch Hẹn" : "Thêm Lịch Hẹn"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingAppointment(null);
                }}
                onOk={() => form.submit()}
            >
                <Form form={form} layout="vertical" onFinish={handleAddOrUpdateAppointment}>
                    <Form.Item
                        name="customerId"
                        label="ID Khách Hàng"
                        rules={[{ required: true, message: "Vui lòng nhập ID khách hàng!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="serviceId"
                        label="Dịch Vụ"
                        rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
                    >
                        <Select placeholder="Chọn dịch vụ">
                            {services.map((service) => (
                                <Option key={service.serviceId} value={service.serviceId}>
                                    {service.serviceName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="scheduledDate"
                        label="Ngày Hẹn"
                        rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="timeSlotId"
                        label="Khung Giờ"
                        rules={[{ required: true, message: "Vui lòng chọn khung giờ!" }]}
                    >
                        <Select placeholder="Chọn khung giờ">
                            {timeSlots.map((slot) => (
                                <Option key={slot.timeSlotId} value={slot.timeSlotId}>
                                    {slot.timeSlot}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="statusName"
                        label="Trạng Thái"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            {statuses.map((status) => (
                                <Option key={status.value} value={status.value}>
                                    {status.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="carModel"
                        label="Mô Hình Xe"
                        rules={[{ required: true, message: "Vui lòng nhập mô hình xe!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="carVersion"
                        label="Phiên Bản Xe"
                        rules={[{ required: true, message: "Vui lòng nhập phiên bản xe!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="carPlateNumber"
                        label="Biển Số Xe"
                        rules={[{ required: true, message: "Vui lòng nhập biển số xe!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="notes" label="Ghi Chú">
                        <Input.TextArea placeholder="Nhập ghi chú (không bắt buộc)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminAppointments;
