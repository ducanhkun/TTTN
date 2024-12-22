import React from "react";
import { Layout, Row, Col, Typography, Card } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
    return (
        <Layout style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
            <Content>
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "30px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Title level={2} style={{ textAlign: "center", color: "#C00000" }}>
                        Giới thiệu về Honda Sửa chữa Ô tô
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: "16px",
                            textAlign: "justify",
                            marginTop: "20px",
                        }}
                    >
                        Honda Sửa chữa Ô tô là một trong những trung tâm sửa chữa và bảo trì ô tô hàng đầu tại Việt Nam.
                        Chúng tôi cam kết mang lại dịch vụ tốt nhất, đáp ứng mọi nhu cầu của khách hàng về sửa chữa,
                        bảo trì và chăm sóc xe ô tô. Với đội ngũ kỹ thuật viên giàu kinh nghiệm và hệ thống trang thiết bị
                        hiện đại, chúng tôi tự tin xử lý mọi vấn đề kỹ thuật của xe bạn.
                    </Paragraph>

                    <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                cover={
                                    <img
                                        alt="Professional Team"
                                        src="./Img/31028961558097871157473134158517155111379858n-21153907.webp"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <Title level={4} style={{ textAlign: "center", color: "#C00000" }}>
                                    Đội ngũ chuyên nghiệp
                                </Title>
                                <Paragraph style={{ textAlign: "justify" }}>
                                    Chúng tôi có đội ngũ kỹ thuật viên được đào tạo bài bản, giàu kinh nghiệm và luôn tận
                                    tâm với công việc. Mỗi chiếc xe được chăm sóc như chính chiếc xe của mình.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                cover={
                                    <img
                                        alt="Modern Equipment"
                                        src="./Img/honda-ens1-14-1651411612867396588160.webp"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <Title level={4} style={{ textAlign: "center", color: "#C00000" }}>
                                    Trang thiết bị hiện đại
                                </Title>
                                <Paragraph style={{ textAlign: "justify" }}>
                                    Trung tâm của chúng tôi được trang bị hệ thống máy móc hiện đại, hỗ trợ việc kiểm tra
                                    và sửa chữa nhanh chóng, hiệu quả và chính xác.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                }}
                                cover={
                                    <img
                                        alt="Customer Service"
                                        src="./Img/xe-oto-honda.jpg"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <Title level={4} style={{ textAlign: "center", color: "#C00000" }}>
                                    Dịch vụ khách hàng tận tâm
                                </Title>
                                <Paragraph style={{ textAlign: "justify" }}>
                                    Chúng tôi luôn đặt khách hàng lên hàng đầu, cung cấp dịch vụ tận tâm, đảm bảo sự hài lòng
                                    và an tâm tuyệt đối cho khách hàng.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>

                    <Title level={3} style={{ textAlign: "center", color: "#C00000", marginTop: "30px" }}>
                        Sứ mệnh của chúng tôi
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: "16px",
                            textAlign: "justify",
                            marginTop: "10px",
                        }}
                    >
                        Mang đến trải nghiệm dịch vụ sửa chữa ô tô đáng tin cậy nhất, chúng tôi luôn nỗ lực để đảm bảo rằng
                        mỗi khách hàng rời khỏi trung tâm với sự hài lòng tuyệt đối. Đến với Honda Sửa chữa Ô tô, bạn sẽ
                        cảm nhận được sự khác biệt từ dịch vụ đẳng cấp.
                    </Paragraph>
                </div>
            </Content>
        </Layout>
    );
};

export default AboutPage;
