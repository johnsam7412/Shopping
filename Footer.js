import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import titanlogo from "../image/titan-logo.svg"; // adjust path

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo + About */}
        <div className="footer-col">
          <img src={titanlogo} alt="Titan Logo" className="footer-logo" />
          <p>
            Titan is India’s leading watch brand, known for timeless design,
            craftsmanship, and modern elegance. Discover collections
            that define the art of timekeeping.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/mens">Mens</Link></li>
            <li><Link to="/womens">Womens</Link></li>
            <li><Link to="">Smart Watches</Link></li>
            <li><Link to="">Premium Watches</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="">Contact Us</Link></li>
            <li><Link to="">FAQs</Link></li>
            <li><Link to="">Shipping & Returns</Link></li>
            <li><Link to="">Warranty</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/TitanWatchesIndia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/titanwatchesindia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/titanwatches"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/user/titanwatches"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Titan Company Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
