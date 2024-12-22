import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/usercomponents/Header";
import UserFooter from "../components/usercomponents/Footer"; 

const { Content } = Layout;

const UserLayout = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Header */}
            <UserHeader />

            {/* Main Content */}
            <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
                <Outlet />
            </Content>

            {/* Footer */}
            <UserFooter />
        </Layout>
    );
};

export default UserLayout;
