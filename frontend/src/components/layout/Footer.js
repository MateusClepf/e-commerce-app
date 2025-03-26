import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Commerce Store</h3>
            <p>Quality products for every need.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Help</h3>
            <ul className="footer-links">
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/">Returns</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: support@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;