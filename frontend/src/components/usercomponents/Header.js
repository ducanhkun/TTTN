import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import { CalendarOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const UserHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState("");
    const location = useLocation(); 

    useEffect(() => {
        const storedFullName = localStorage.getItem("fullName");
        if (storedFullName) {
            setIsLoggedIn(true);
            setFullName(storedFullName);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setFullName("");
        message.success("Đăng xuất thành công!");
    };

    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#C00000",
                padding: "0 20px",
                height: "70px",
            }}
        >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <Link to="/">
                    <img
                        src="./Img/y-nghia-logo-honda.jpg"
                        alt="Honda Service Logo"
                        style={{
                            height: "50px",
                            marginRight: "10px",
                            marginTop: "25px",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                </Link>
            </div>

            {/* Navigation Menu */}
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname]} 
                style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderBottom: "none",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Menu.Item
                    key="/"
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link to="/" style={{ color: "white" }}>
                        Trang chủ
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/servicespage"
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link to="/servicespage" style={{ color: "white" }}>
                        Dịch vụ
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/newspage"
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link to="/newspage" style={{ color: "white" }}>
                        Tin Tức
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/about"
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link to="/about" style={{ color: "white" }}>
                        Về chúng tôi
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/my-appointments"
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link to="/my-appointments" style={{ color: "white" }}>
                        Lịch hẹn của tôi
                    </Link>
                </Menu.Item>
            </Menu>

            {/* Auth Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {isLoggedIn ? (
                    <>
                        <span style={{ color: "white", fontWeight: "bold" }}>
                            Xin chào, {fullName}
                        </span>
                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "#C00000",
                                border: "1px solid #C00000",
                                height: "36px",
                                width: "120px",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <Link to="/login">
                        <Button
                            style={{
                                backgroundColor: "white",
                                color: "#C00000",
                                border: "1px solid #C00000",
                                height: "36px",
                                width: "120px",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Link>
                )}
                <Link
                    to={isLoggedIn ? "/booking" : "/login"}
                    onClick={() => {
                        if (!isLoggedIn) {
                            message.warning("Vui lòng đăng nhập trước khi đặt lịch!");
                        }
                    }}
                >
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: "#FFD700",
                            color: "#C00000",
                            border: "none",
                            height: "36px",
                            width: "120px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.3s, box-shadow 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
                        icon={<CalendarOutlined style={{ marginRight: "5px" }} />}
                    >
                        Đặt lịch ngay
                    </Button>
                </Link>
            </div>
        </Header>
    );
};

export default UserHeader;
