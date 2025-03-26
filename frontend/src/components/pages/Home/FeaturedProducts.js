import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import './FeaturedProducts.css';

const FeaturedProducts = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }
  
  return (
    <div className="featured-products-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <Link to={`/products/${product.id}`}>
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'} 
              alt={product.name} 
              className="product-image" 
            />
          </Link>
          <div className="product-details">
            <h3 className="product-title">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
            <div className="product-availability">
              {product.isAvailable && product.stockQuantity > 0 ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            <button 
              className="btn btn-primary btn-add-to-cart" 
              onClick={() => handleAddToCart(product)} 
              disabled={!product.isAvailable || product.stockQuantity <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;