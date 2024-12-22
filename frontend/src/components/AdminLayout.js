import React from "react";
import { Layout, Menu, Typography, Badge, Avatar, Dropdown } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
    HomeOutlined,
    UserOutlined,
    CalendarOutlined,
    CreditCardOutlined,
    BellOutlined,
    FileTextOutlined,
    TeamOutlined,
    FileOutlined, 
} from "@ant-design/icons";

const { Header, Content, Sider, Footer } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
    const userMenu = (
        <Menu>
            <Menu.Item key="1">Hồ sơ cá nhân</Menu.Item>
            <Menu.Item key="2">Đăng xuất</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider
                collapsible
                width={260} 
                style={{ backgroundColor: "#001529" }}
            >
                <div
                    className="logo"
                    style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "24px", 
                        fontWeight: "bold",
                        letterSpacing: "1px",
                    }}
                >
                    HonDa Admin
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    style={{
                        fontSize: "16px", 
                        fontWeight: "500", 
                        marginTop: "20px", 
                    }}
                >
                    <Menu.Item
                        key="1"
                        icon={<HomeOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px", // Tăng chiều cao menu item
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/services">Quản lý Dịch vụ</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<FileTextOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/services-detail">Chi tiết Dịch vụ</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={<UserOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/customers">Quản lý Khách hàng</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="4"
                        icon={<CalendarOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/appointments">Quản lý Lịch Hẹn</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="5"
                        icon={<CreditCardOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/news">Quản lý Tin Tức</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="7"
                        icon={<TeamOutlined />}
                        style={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link to="/admin/users">Quản lý Tài khoản</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            {/* Main Layout */}
            <Layout>
                {/* Header */}
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Tiêu đề */}
                    <Title level={4} style={{ margin: 0 }}>
                        HonDa Admin
                    </Title>

                    {/* Phần thông báo và tên người dùng */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        {/* Thông báo */}
                        <Badge count={5}>
                            <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
                        </Badge>

                        {/* Người dùng */}
                        <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
                                <span style={{ marginLeft: "10px", fontWeight: "500" }}>Admin</span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                {/* Content */}
                <Content
                    style={{
                        margin: "20px",
                        padding: "20px",
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Outlet />
                </Content>

                {/* Footer */}
                <Footer style={{ textAlign: "center", background: "#f5f5f5" }}>
                    © {new Date().getFullYear()} Honda Admin.
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
