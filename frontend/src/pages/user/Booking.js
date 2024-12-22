import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const { Option } = Select;

const carModels = [
    { label: "Honda Civic", versions: ["Civic 1.5G", "Civic 1.5L"] },
    { label: "Honda Accord", versions: ["Accord 1.5 Turbo"] },
    { label: "Honda CR-V", versions: ["CR-V 1.5 Turbo", "CR-V 2.0E"] },
    { label: "Raize", versions: ["Raize 1.0 Turbo"] },
    { label: "Vios", versions: ["Vios 1.5E", "Vios 1.5G"] },
    { label: "Veloz", versions: ["Veloz Cross"] },
    { label: "Corolla Cross", versions: ["Corolla Cross 1.8HV", "Corolla Cross 1.8V"] },
    { label: "Camry", versions: ["Camry 2.5Q", "Camry 2.0G"] },
    { label: "Corolla Altis", versions: ["Corolla Altis 1.8G", "Corolla Altis 1.8V"] },
    { label: "Innova", versions: ["Innova 2.0E", "Innova 2.0G"] },
    { label: "Fortuner", versions: ["Fortuner 2.4V", "Fortuner 2.8G"] },
    { label: "Rush", versions: ["Rush 1.5AT"] },
    { label: "Wigo", versions: ["Wigo 1.2G"] },
    { label: "Land Cruiser Prado", versions: ["Prado VX"] },
    { label: "Yaris", versions: ["Yaris 1.5G"] },
    { label: "Hiace", versions: ["Hiace 2.5L Diesel"] },
    { label: "Land Cruiser", versions: ["Land Cruiser VX"] },
    { label: "Hilux", versions: ["Hilux 2.8G"] },
    { label: "Avanza", versions: ["Avanza Premio"] },
    { label: "Alphard", versions: ["Alphard Executive Lounge"] },
    { label: "Yaris Cross", versions: ["Yaris Cross HEV"] },
    { label: "Innova Cross", versions: ["Innova Cross 2.0V"] },
];

const Booking = () => {
    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [carVersions, setCarVersions] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get("http://localhost:3306/api/services");
                setServices(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách dịch vụ:", error);
                message.error("Không thể tải danh sách dịch vụ.");
            }
        };

        const fetchTimeSlots = async () => {
            try {
                const { data } = await axios.get("http://localhost:3306/api/time-slots");
                setTimeSlots(data); 
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khung giờ:", error);
                message.error("Không thể tải danh sách khung giờ.");
            }
        };

        fetchServices();
        fetchTimeSlots();
    }, []);

    const handleCarModelChange = (value) => {
        const selectedModel = carModels.find(model => model.label === value);
        setCarVersions(selectedModel ? selectedModel.versions : []);
        form.setFieldsValue({ carVersion: undefined });
    };

    const handleTimeSlotSelect = (timeSlotId) => {
        setSelectedTimeSlot(timeSlotId);
        form.setFieldsValue({ timeSlotId }); 
    };

    const handleFormSubmit = async (values) => {
        const customerId = localStorage.getItem("customerId");
    
        if (!customerId) {
            message.error("Vui lòng đăng nhập để đặt lịch.");
            return;
        }
    
        const bookingData = {
            customerId,
            serviceId: values.serviceId,
            carModel: values.carModel,
            carVersion: values.carVersion,
            carPlateNumber: values.carPlateNumber,
            manufactureYear: values.manufactureYear,
            scheduledDate: moment(values.date).format("YYYY-MM-DD"),
            timeSlotId: values.timeSlotId,
            notes: values.notes,
            statusId: 2, 
        };
    
        try {
            await axios.post("http://localhost:3306/api/appointments", bookingData);
            message.success("Đặt lịch thành công!");
    
            // Chuyển hướng sang trang SuccessPage
            navigate("/success");
        } catch (error) {
            console.error("Lỗi khi đặt lịch:", error);
            message.error("Đặt lịch thất bại, vui lòng thử lại sau.");
        }
    };
       

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", color: "#C00000" }}>Đặt Lịch Hẹn</h2>
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    name="serviceId"
                    label="Chọn Dịch Vụ"
                    rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
                >
                    <Select placeholder="Chọn dịch vụ">
                        {services.map(service => (
                            <Option key={service.serviceId} value={service.serviceId}>
                                {service.serviceName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="carModel"
                    label="Chọn Dòng Xe"
                    rules={[{ required: true, message: "Vui lòng chọn dòng xe!" }]}
                >
                    <Select placeholder="Chọn dòng xe" onChange={handleCarModelChange}>
                        {carModels.map(model => (
                            <Option key={model.label} value={model.label}>
                                {model.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="carVersion"
                    label="Chọn Phiên Bản Xe"
                    rules={[{ required: true, message: "Vui lòng chọn phiên bản xe!" }]}
                >
                    <Select placeholder="Chọn phiên bản xe">
                        {carVersions.map(version => (
                            <Option key={version} value={version}>
                                {version}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="carPlateNumber"
                    label="Biển Số Xe"
                    rules={[{ required: true, message: "Vui lòng nhập biển số xe!" }]}
                >
                    <Input placeholder="Nhập biển số xe" />
                </Form.Item>

                <Form.Item
                    name="manufactureYear"
                    label="Năm Sản Xuất"
                    rules={[{ required: true, message: "Vui lòng nhập năm sản xuất!" }]}
                >
                    <Input type="number" placeholder="Nhập năm sản xuất" />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Chọn Ngày"
                    rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
                >
                    <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
    name="timeSlotId"
    label="Chọn Giờ"
    rules={[{ required: true, message: "Vui lòng chọn khung giờ!" }]}
>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {timeSlots.map((slot) => (
            <Button
                key={slot.timeSlotId}
                style={{
                    width: "60px",
                    height: "40px",
                    fontSize: "10px",
                    backgroundColor: slot.isAvailable
                        ? selectedTimeSlot === slot.timeSlotId
                            ? "#FFD700" // Màu vàng khi được chọn
                            : "#FFF" // Màu trắng khi có thể chọn
                        : "#E0E0E0", // Màu xám khi không khả dụng
                    border: "1px solid #000",
                    color: slot.isAvailable ? "#000" : "#888", // Màu chữ xám khi không khả dụng
                    pointerEvents: slot.isAvailable ? "auto" : "none", // Không thể nhấn khi không khả dụng
                    transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                    if (slot.isAvailable) e.target.style.borderColor = "#FF0000"; // Viền màu đỏ khi hover nếu khả dụng
                }}
                onMouseLeave={(e) => {
                    e.target.style.borderColor = slot.isAvailable
                        ? selectedTimeSlot === slot.timeSlotId
                            ? "#FFD700" // Viền vàng khi được chọn
                            : "#000" // Viền đen khi có thể chọn
                        : "#000"; // Giữ viền đen khi không khả dụng
                }}
                onClick={() => handleTimeSlotSelect(slot.timeSlotId)}
                disabled={!slot.isAvailable} // Vô hiệu hóa nút khi không khả dụng
            >
                {moment(slot.timeSlot, "HH:mm:ss").format("hh:mm A")}
            </Button>
        ))}
    </div>
</Form.Item>

                <Form.Item name="notes" label="Ghi Chú">
                    <Input.TextArea placeholder="Nhập ghi chú (không bắt buộc)" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Đặt Lịch
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Booking;
