import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("⚠️ Please login to add items to cart!");
      navigate("/sign");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        alert("Item is already in cart");
        return prev;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Optional: auto-clear cart if user is logged out
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username && cart.length > 0) clearCart();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart, //  expose clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
