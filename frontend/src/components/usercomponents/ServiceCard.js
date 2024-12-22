import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Meta } = Card;

const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/services");
                setServices(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách dịch vụ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2
                style={{
                    marginBottom: "20px",
                    color: "#C00000",
                    textTransform: "uppercase", 
                    textAlign: "left", 
                }}
            >
                Dịch vụ của chúng tôi
            </h2>
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Spin size="large" />
                </div>
            ) : services.length === 0 ? (
                <Empty
                    description="Hiện tại chưa có dịch vụ nào"
                    style={{ marginTop: "50px" }}
                />
            ) : (
                <Row gutter={[16, 16]}>
                    {services.slice(0, 4).map((service) => ( 
                        <Col key={service.serviceId} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={service.serviceName}
                                        src={service.serviceImage}
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                            borderTopLeftRadius: "8px",
                                            borderTopRightRadius: "8px",
                                        }}
                                    />
                                }
                                style={{
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                }}
                            >
                                <Meta
                                    title={
                                        <div
                                            style={{
                                                whiteSpace: "nowrap", 
                                                overflow: "hidden", 
                                                textOverflow: "ellipsis", 
                                            }}
                                        >
                                            {service.serviceName}
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <p style={{ marginBottom: "8px", color: "#555" }}>
                                                {service.description.slice(0, 50)}...
                                            </p>
                                            <p style={{ fontWeight: "bold", color: "#C00000" }}>
                                                Giá: {parseInt(service.price).toLocaleString("vi-VN")}₫
                                            </p>
                                        </div>
                                    }
                                />
                                <Link to={`/services/${service.serviceId}`}>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginTop: "10px",
                                            backgroundColor: "#C00000",
                                            border: "none",
                                        }}
                                        block
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ServiceCard;
