import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ category: '' });
  
  const location = useLocation();
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Extract category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilter(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        let url = `${API_URL}/products`;
        if (filter.category) {
          url += `?category=${filter.category}`;
        }
        
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [API_URL, filter]);
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    setFilter(prev => ({ ...prev, category: e.target.value }));
  };
  
  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            value={filter.category} 
            onChange={handleCategoryChange}
            className="form-control"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Footwear">Footwear</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>
      
      {/* Products grid */}
      {loading ? (
        <p className="loading">Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;