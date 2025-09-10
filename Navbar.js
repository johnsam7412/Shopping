import React, { useState, useContext } from "react";
import "./Home/index.css";
import titanlogo from "../TitanEvolve/image/titan-logo.svg"
import { Link } from "react-router-dom";
import { CartContext } from "./Context/CartContext";  // 
import { FaBars, FaTimes } from "react-icons/fa"; // hamburger + close

function Navbar() {
  const [openAccount, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile menu

  // Get cart from context
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/"><img src={titanlogo} alt="Titan Logo" /></Link>
      </div>

      {/* Hamburger Icon (only mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/mens" onClick={() => setMenuOpen(false)}>Mens</Link></li>
        <li><Link to="/womens" onClick={() => setMenuOpen(false)}>Womens</Link></li>
        <li><Link to="" onClick={() => setMenuOpen(false)}>Smart Watches</Link></li>
        <li><Link to="" onClick={() => setMenuOpen(false)}>Premium Watches</Link></li>
      </ul>

      {/* Right Side (Account + Cart) */}
      <div className="nav-icons">
        {/* Account Dropdown */}
        <div
          className="account-container"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="account-label">👤 Account</div>
          {openAccount && (
            <div className="dropdown-card">
              <h4>Welcome {localStorage.getItem("username") || "Guest"}!</h4>
              <p>Enjoy A Personalized Timekeeping Experience.</p>
              <Link to="/login"><button className="login-btn">Login</button></Link>
              <Link to="/sign"><button className="signup-btn">Signup</button></Link>
              <Link to="/logout"><button className="logout-btn">Logout</button></Link>
              <Link to="/delete"><button className="delete-btn">Delete Account</button></Link>
            </div>
          )}
        </div>

        {/* Cart with count */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒Cart</span>
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

