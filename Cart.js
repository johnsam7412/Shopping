import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";


const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (

    <div>

      <div className="cart-container">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-img" />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  {/* Quantity Input with Buttons */}
                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      readOnly
                    />
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <p><b>Subtotal:</b> ₹{item.price * item.qty}</p>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: ₹{total}</h3>
              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        )}

      </div>


      </div>
      );
};

      export default Cart;
