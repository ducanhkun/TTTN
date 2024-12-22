import React from "react";
import ServiceCard from "../../components/usercomponents/ServiceCard"; 
import Banner from "../../components/usercomponents/Banner"; 
import NewsCard from "../../components/usercomponents/NewsCard";
const Home = () => {
    return (
        <div style={{ padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
                <Banner />
                <ServiceCard />
                <NewsCard />
            </div>
        </div>
    );
};

export default Home;
