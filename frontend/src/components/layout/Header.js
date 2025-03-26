import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { getItemCount } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-logo">
          <Link to="/">E-Commerce Store</Link>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <span className="material-icons">shopping_cart</span>
            {getItemCount() > 0 && (
              <span className="cart-badge">{getItemCount()}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span>Hello, {user.firstName}</span>
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;