import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Typography, Card, Row, Col, Divider } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ServiceDetail = () => {
    const { serviceId } = useParams(); 
    const [details, setDetails] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3306/api/services/details/${serviceId}`);
                setDetails(response.data); 
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết dịch vụ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
    }, [serviceId]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!details || details.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <Text type="danger">Không tìm thấy chi tiết nào cho dịch vụ này.</Text>
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>

            <Title level={4} style={{ color: "#C00000", marginBottom: "20px" }}>
                Các bước thực hiện
            </Title>
            <Row gutter={[16, 16]}>
                {details.map((step) => (
                    <Col key={step.detailId} xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                            cover={
                                <img
                                    alt={step.stepDescription}
                                    src={step.stepImage}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                    }}
                                />
                            }
                        >
                            <Title level={5}>{`Bước ${step.stepOrder}`}</Title>
                            <Text>{step.stepDescription}</Text>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ServiceDetail;
