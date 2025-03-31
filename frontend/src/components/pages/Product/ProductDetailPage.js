import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useContext(CartContext);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [API_URL, id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stockQuantity || 0)) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!product) {
    return <div className="not-found">Product not found.</div>;
  }
  
  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-container">
          <img 
            src={product.imageUrl || `${process.env.REACT_APP_PLACEHOLDER_IMAGE_URL}/500x500?text=No+Image`} 
            alt={product.name} 
            className="product-detail-image" 
          />
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
          <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
          
          <div className="product-availability">
            {product.isAvailable && product.stockQuantity > 0 ? (
              <span className="in-stock">In Stock ({product.stockQuantity} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {product.isAvailable && product.stockQuantity > 0 && (
            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  min="1" 
                  max={product.stockQuantity} 
                  value={quantity} 
                  onChange={handleQuantityChange} 
                  className="form-control quantity-input"
                />
              </div>
              
              <button 
                className="btn btn-primary btn-add-to-cart" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          )}
          
          <Link to="/products" className="back-to-products">&larr; Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;