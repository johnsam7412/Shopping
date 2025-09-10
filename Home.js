import React, { useState } from "react";

import slide4 from "../../TitanEvolve/image/slide4.jpg"
import slide2 from "../../TitanEvolve/image/slide2.webp"
import slide3 from "../../TitanEvolve/image/slide3.webp"
import slide5 from "../../TitanEvolve/image/slide5.jpg"
import slide7 from "../../TitanEvolve/image/slide7.jpg"

import img4 from "../../TitanEvolve/image/img4.png"
import img5 from "../../TitanEvolve/image/img5.png"
import img6 from "../../TitanEvolve/image/img6.png"

import rev1 from "../../TitanEvolve/image/rev1.png"
import rev2 from "../../TitanEvolve/image/rev2.png"
import rev3 from "../../TitanEvolve/image/rev3.png"
import rev4 from "../../TitanEvolve/image/rev4.png"
import rev5 from "../../TitanEvolve/image/rev5.png"
import rev6 from "../../TitanEvolve/image/rev6.png"
import rev7 from "../../TitanEvolve/image/rev7.png"
import rev8 from "../../TitanEvolve/image/rev8.png"
import rev9 from "../../TitanEvolve/image/rev9.png"
import rev10 from "../../TitanEvolve/image/rev10.png"

import shop1 from "../../TitanEvolve/image/shop1.png"
import shop2 from "../../TitanEvolve/image/shop2.png"
import shop3 from "../../TitanEvolve/image/shop3.png"
import shop4 from "../../TitanEvolve/image/shop4.png"
import shop5 from "../../TitanEvolve/image/shop5.png"
import shop6 from "../../TitanEvolve/image/shop6.png"
import shop7 from "../../TitanEvolve/image/shop7.png"
import shop8 from "../../TitanEvolve/image/shop8.png"

import col1 from "../../TitanEvolve/image/col1.webp"
import col2 from "../../TitanEvolve/image/col2.webp"
import col3 from "../../TitanEvolve/image/col3.webp"
import col4 from "../../TitanEvolve/image/col4.webp"
import col5 from "../../TitanEvolve/image/col5.webp"
import col6 from "../../TitanEvolve/image/col6.webp"
import col7 from "../../TitanEvolve/image/col7.webp"
import col8 from "../../TitanEvolve/image/col8.webp"





function Home() {

    const reviews = [rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev8, rev9, rev10];
    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
    };
    return (
        <div className="home">


            <div className="banner">
                <div className="slider">
                    <div className="slides">
                        <img src={slide2} alt="watch2" />
                        <img src={slide4} alt="watch1" />
                        <img src={slide3} alt="watch3" />
                        <img src={slide5} alt="watch2" />


                    </div>
                </div>

            </div>

            <div className="filters">
                <p>Get up to ₹250 cashback on payment via Mobikwik wallet over Rs. 999. T&C Apply*. Use Code NEW10 and get 10% OFF* on non-discounted Watches over Rs. 2499. Maximum Discount: Rs. 1200. T&C Apply*. Get 10% Cashback on Minimum transaction value of ₹999 on your payment via MobiKwik UPI. T&C Apply*. Get 15% Cashback on Minimum transaction value of ₹1499 on your payment via MobiKwik UPI. T&C Apply*.</p>
            </div>



            <div className="about-section">
                <div className="about-content">
                    <h2 className="about-head">About Titan Watches</h2>
                    <p>
                        Titan is one of the most trusted and stylish watch brands in India and
                        worldwide. Known for its timeless designs, durability, and innovation,
                        Titan offers a wide range of watches from luxury collections to
                        everyday wear. With precision craftsmanship and modern elegance,
                        Titan continues to redefine the art of timekeeping.
                    </p>
                    <button className="about-btn">Explore Collection</button>
                </div>

                <div className="about-image">
                    <img src={slide7} alt="watch2" />
                </div>
            </div>




            {/* Edage */}

            {/*  Titan Edge Section */}
            <div className="edge-section">
                <div className="edge-hero">
                    <img src={img4} alt="Titan Edge Banner" />
                </div>

                <div className="edge-trends">
                    <div className="trend">
                        <img src={img5} alt="Classic Trend" />
                        <div className="trend-btn">

                        </div>
                    </div>

                    <div className="trend">
                        <img src={img6} alt="Chic Trend" />
                        <div className="trend-btn">

                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials">
                <h2 className="title">Customer Reviews</h2>

                <div className="slider-container">
                    <button className="prev" onClick={prevSlide}>❮</button>

                    <div className="slide">
                        <img src={reviews[index]} alt={`review-${index}`} />
                    </div>

                    <button className="next" onClick={nextSlide}>❯</button>
                </div>
            </div>


            {/* Shop  */}
            <div className="brands-section">
                <h2 className="brands-title">SHOP BY BRANDS</h2>
                <div className="brands-grid">
                    <div className="brand-card">

                        <img src={shop1} alt="" />
                    </div>
                    <div className="brand-card">

                        <img src={shop2} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop3} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop4} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop5} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop6} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop7} alt="" />
                    </div>
                    <div className="brand-card">
                        <img src={shop8} alt="" />
                    </div>
                </div>

            </div>



            {/* collection  */}

            <div className="collections-page">
                <div className="head"><h2>
                    Collection
                </h2>
                </div>
                <div className="collections-grid">
                    <div className="collection-card">
                        <img src={col1} alt="Collection 1" />
                    </div>
                    <div className="collection-card">
                        <img src={col2} alt="Collection 2" />
                    </div>
                    <div className="collection-card">
                        <img src={col3} alt="Collection 3" />
                    </div>
                    <div className="collection-card">
                        <img src={col4} alt="Collection 4" />
                    </div>
                    <div className="collection-card">
                        <img src={col5} alt="Collection 4" />
                    </div>
                    <div className="collection-card">
                        <img src={col6} alt="Collection 4" />
                    </div>
                    <div className="collection-card">
                        <img src={col7} alt="Collection 4" />
                    </div>
                    <div className="collection-card">
                        <img src={col8} alt="Collection 4" />
                    </div>

                    {/* Add more images */}
                </div>
            </div>

            
            

    
        </div >

    );
}

export default Home;
