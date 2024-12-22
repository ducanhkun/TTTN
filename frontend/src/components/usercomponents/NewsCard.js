import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button, Spin, Empty } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Meta } = Card;

const NewsCard = () => {
    const [news, setNews] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/news");
                setNews(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách tin tức:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
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
                Tin tức mới nhất
            </h2>
            {loading ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Spin size="large" />
                </div>
            ) : news.length === 0 ? (
                <Empty
                    description="Hiện tại chưa có tin tức nào"
                    style={{ marginTop: "50px" }}
                />
            ) : (
                <Row gutter={[16, 16]}>
                    {news.slice(0, 4).map((item) => ( 
                        <Col key={item.newsId} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={item.title}
                                        src={item.image}
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
                                            {item.title}
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <p style={{ marginBottom: "8px", color: "#555" }}>
                                                {item.content.slice(0, 50)}...
                                            </p>
                                            <p style={{ fontStyle: "italic", color: "#888" }}>
                                                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                                            </p>
                                        </div>
                                    }
                                />
                                <Link to={`/news/${item.newsId}`}>
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

export default NewsCard;
