import React, { useContext } from 'react';
import img1 from "../../TitanEvolve/image/img1.webp"
import img2 from "../../TitanEvolve/image/img2.webp"
import img3 from "../../TitanEvolve/image/img3.webp"

import wom1 from "../../TitanEvolve/image/wom1.jpeg";
import wom2 from "../../TitanEvolve/image/wom2.jpeg";
import wom3 from "../../TitanEvolve/image/wom3.jpeg";
import wom4 from "../../TitanEvolve/image/wom4.jpeg";
import wom5 from "../../TitanEvolve/image/wom5.jpeg";
import wom6 from "../../TitanEvolve/image/wom6.jpeg";
import wom7 from "../../TitanEvolve/image/wom7.jpeg";
import wom8 from "../../TitanEvolve/image/wom8.jpeg";



import col1 from "../../TitanEvolve/image/col1.webp"
import col2 from "../../TitanEvolve/image/col2.webp"
import col3 from "../../TitanEvolve/image/col3.webp"
import col4 from "../../TitanEvolve/image/col4.webp"
import col5 from "../../TitanEvolve/image/col5.webp"
import col6 from "../../TitanEvolve/image/col6.webp"
import col7 from "../../TitanEvolve/image/col7.webp"
import col8 from "../../TitanEvolve/image/col8.webp"
import { CartContext } from '../Context/CartContext';


const Women = () => {
    const { addToCart } = useContext(CartContext);

    const products = [
        { id: 11, name: "Titan Watch", price: 2499, img: wom1 },
        { id: 12, name: "Titan Watch", price: 6000, img: wom2 },
        { id: 13, name: "Titan Watch", price: 10000, img: wom3 },
        { id: 14, name: "Titan Watch", price: 5000, img: wom4 },
        { id: 15, name: "Titan Watch", price: 7500, img: wom5 },
        { id: 16, name: "Titan Watch", price: 12500, img: wom6 },
        { id: 17, name: "Titan Watch", price: 8500, img: wom7 },
        { id: 18, name: "Titan Watch", price: 3500, img: wom8 },
        { id: 19, name: "Titan Watch", price: 6700, img: wom8 },
        { id: 20, name: "Titan Watch", price: 15500, img: wom2 },
    ];

    return (

        <div>

            <div className='menslider'>

                <div className='menslide'>
                    <img src={img1} alt='' />
                    <img src={img2} alt='' />
                    <img src={img3} alt='' />
                </div>

            </div>

            <div className='product'>
                {products.map((p) => (
                    <div className="product-card" key={p.id}>
                        <img src={p.img} alt={p.name} className="product-img" />
                        <div className="product-info">
                            <h3 className="product-name">{p.name}</h3>
                            <p className="product-price">₹{p.price}</p>
                            <button className="add-cart-btn" onClick={() => addToCart(p)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                ))}
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


        </div>


    );
};

export default Women;