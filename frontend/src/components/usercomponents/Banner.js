import React from "react";
import { Carousel } from "antd";

const Banner = () => {
    const bannerImages = [
        {
            src: "./Img/01-banner-top-xe-oto-honda-city-2018.jpg", 
            alt: "Banner 1",
        },
        {
            src: "./Img/banner-du-toan-chi-phi.jpg", 
            alt: "Banner 2",
        },
    ];

    return (
        <div
            style={{
                width: "100%",
                overflow: "hidden",
                marginBottom: "20px",
                borderRadius: "10px", 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
            }}
        >
            <Carousel autoplay dotPosition="bottom" effect="fade">
                {bannerImages.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{
                                width: "100%",
                                height: "400px", 
                                objectFit: "cover", 
                                borderRadius: "10px", 
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
