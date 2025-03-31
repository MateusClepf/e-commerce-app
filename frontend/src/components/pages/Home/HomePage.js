import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FeaturedProducts from './FeaturedProducts';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const PLACEHOLDER_URL = process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com';
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products?limit=4`);
        setFeaturedProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured products');
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, [API_URL]);
  
  const categories = [
    { name: 'Electronics', icon: '🖥️' },
    { name: 'Clothing', icon: '👕' },
    { name: 'Footwear', icon: '👟' },
    { name: 'Home', icon: '🏠' },
    { name: 'Accessories', icon: '👜' }
  ];
  
  // Hero section style
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${PLACEHOLDER_URL}/1200x400?text=Hero+Banner')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    padding: '5rem 0',
    textAlign: 'center',
    marginBottom: '3rem',
    borderRadius: '8px'
  };

  return (
    <div className="home-page">
      {/* Hero section */}
      <section style={heroStyle}>
        <div className="hero-content">
          <h1>Welcome to Our E-Commerce Store</h1>
          <p>Discover amazing products at great prices</p>
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>
      
      {/* Categories section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link to={`/products?category=${category.name}`} className="category-card" key={index}>
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured products section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View All</Link>
        </div>
        
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <FeaturedProducts products={featuredProducts} />
        )}
      </section>
      
      {/* Promotion banner */}
      <section className="promotion-banner">
        <div className="promotion-content">
          <h2>Special Offer!</h2>
          <p>Get 20% off on all products for a limited time.</p>
          <Link to="/products" className="btn btn-secondary">Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;