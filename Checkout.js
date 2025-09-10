import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.mobile || !form.address) {
      alert("Please fill all fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please login to place an order.");
      navigate("/sign");
      return;
    }

    const orderData = {
      username,
      total,
      shipping: form,
      items: cart.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        img: i.img,
      })),
    };

    try {
      setLoading(true);
      const { data: savedOrder } = await axios.post(
        "http://localhost:8080/api/orders",
        orderData
      );

      clearCart();
      alert("Order placed successfully! A confirmation Email & SMS have been sent.");
      navigate(`/order-success/${savedOrder.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-wrapper">
        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
              <h4>Total: ₹{total}</h4>
            </>
          )}
        </div>


        {/* Shipping Form */}

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="+91XXXXXXXXXX"
            value={form.mobile}
            onChange={(e) => {
              let value = e.target.value.replace(/\s+/g, ""); // remove spaces
              setForm({ ...form, mobile: value });
            }}
            pattern="^(\+?\d{10,15})$"
            title="Enter a valid mobile number (e.g., +919876543210)"
            required
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </form>


      </div>

      
    </div>
  );
};

export default Checkout;
