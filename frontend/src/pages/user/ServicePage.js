import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Empty, Pagination } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ServicePage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; 

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

    // Xử lý thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentServices = services.slice(startIndex, endIndex);

    return (
        <div style={{ padding: "20px" }}>
            <h2
                style={{
                    marginBottom: "20px",
                    color: "#C00000",
                    textTransform: "uppercase",
                    textAlign: "center",
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
                <>
                    <Row gutter={[16, 16]}>
                        {currentServices.map((service) => (
                            <Col key={service.serviceId} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={service.serviceName}
                                            src={service.serviceImage}
                                            style={{
                                                height: "150px", 
                                                objectFit: "cover",
                                                borderTopLeftRadius: "8px",
                                                borderTopRightRadius: "8px",
                                            }}
                                        />
                                    }
                                    style={{
                                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                        borderRadius: "8px",
                                        padding: "10px", 
                                    }}
                                >
                                    <Meta
                                        title={
                                            <div
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    fontSize: "14px", 
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {service.serviceName}
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <p
                                                    style={{
                                                        marginBottom: "8px",
                                                        color: "#555",
                                                        fontSize: "12px", 
                                                    }}
                                                >
                                                    {service.description.slice(0, 40)}...
                                                </p>
                                                <p
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "#C00000",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Giá: {parseInt(service.price).toLocaleString("vi-VN")}₫
                                                </p>
                                            </div>
                                        }
                                    />
                                    <Link to={`/services/${service.serviceId}`}>
                                        <button
                                            style={{
                                                marginTop: "10px",
                                                backgroundColor: "#C00000",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 15px", 
                                                fontWeight: "bold",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                                display: "block",
                                                width: "100%",
                                                fontSize: "14px", 
                                            }}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={services.length}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ServicePage;
