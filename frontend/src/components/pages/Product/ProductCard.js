import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  };
  
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img 
          src={product.imageUrl || `${process.env.REACT_APP_PLACEHOLDER_IMAGE_URL}/300x300?text=No+Image`} 
          alt={product.name} 
          className="product-image" 
        />
      </Link>
      
      <div className="product-details">
        <h3 className="product-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
        
        <div className="product-description">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </div>
        
        <div className="product-availability">
          {product.isAvailable && product.stockQuantity > 0 ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-primary btn-add-to-cart" 
            onClick={handleAddToCart} 
            disabled={!product.isAvailable || product.stockQuantity <= 0}
          >
            Add to Cart
          </button>
          <Link 
            to={`/products/${product.id}`} 
            className="btn btn-secondary btn-view-details"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;