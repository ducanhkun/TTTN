import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Empty, Pagination } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const { Meta } = Card;

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentNews = news.slice(startIndex, endIndex);

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
                <>
                    <Row gutter={[16, 16]}>
                        {currentNews.map((item) => (
                            <Col key={item.newsId} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.title}
                                            src={item.image}
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
                                                {item.title}
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
                                                    {item.content.slice(0, 40)}...
                                                </p>
                                                <p
                                                    style={{
                                                        fontStyle: "italic",
                                                        color: "#888",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                                                </p>
                                            </div>
                                        }
                                    />
                                    <Link to={`/news/${item.newsId}`}>
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
                            total={news.length}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsPage;
