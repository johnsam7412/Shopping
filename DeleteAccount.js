import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/CartContext";


function DeleteAccount() {
  const navigate = useNavigate();
  const identifier = localStorage.getItem("username"); // may be username or email
  const { clearCart } = useContext(CartContext);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete your account (${identifier})?`)) {
      try {
        const res = await axios.delete(`http://localhost:8080/api/delete/${identifier}`);
        alert(res.data.message);
        localStorage.removeItem("username");
        clearCart();
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Error deleting account");
      }
    }
  };

  return (
    <div className="delete-container">
      <h2>Your Account: {identifier}</h2>
      <p>If you want to delete your account, click below.</p>
      <button onClick={handleDelete} className="delete-btn">
        Delete My Account
      </button>
    </div>
  );
}

export default DeleteAccount;

