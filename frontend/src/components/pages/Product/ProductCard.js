import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiBarChart2, FiEye } from 'react-icons/fi';
import { CartContext } from '../../../context/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Generate an array of star ratings
  const renderRatingStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-gray-300'}`} 
      />
    ));
  };
  
  // Add support for category display
  const getCategoryName = (product) => {
    // If product has a category object (from API), use its name
    if (product.category && typeof product.category === 'object') {
      return product.category.name;
    }
    // Otherwise, use the legacy category string if available
    return product.category || 'Uncategorized';
  };

  // Handling images properly
  const getProductImage = (product) => {
    // If product has an imageUrl, use it
    if (product.imageUrl) {
      return product.imageUrl;
    }
    // If product has an images array, use the first image
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    // Fallback to placeholder
    return `${process.env.REACT_APP_PLACEHOLDER_IMAGE_URL || 'https://via.placeholder.com'}/300x300?text=No+Image`;
  };

  // Add support for original price vs sale price display
  const getPriceDisplay = (product) => {
    if (product.isOnSale && product.salePrice) {
      return (
        <div className="flex items-center">
          <p className="text-lg font-bold text-primary">
            ${parseFloat(product.salePrice).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through ml-2">
            ${parseFloat(product.price).toFixed(2)}
          </p>
        </div>
      );
    }
    
    return (
      <p className="text-lg font-bold text-primary">
        ${parseFloat(product.price).toFixed(2)}
      </p>
    );
  };
  
  if (viewMode === 'list') {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/3 relative">
          <Link to={`/products/${product.id}`}>
            <img 
              src={getProductImage(product)} 
              alt={product.name} 
              className="w-full h-60 md:h-full object-cover"
            />
            {product.isOnSale && (
              <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </div>
            )}
            {product.newArrival && (
              <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
          </Link>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-dark">
              <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                {product.name}
              </Link>
            </h3>
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Add to wishlist"
            >
              <FiHeart className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center mb-2">
            {renderRatingStars(product.rating)}
            <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-1">
            Category: <span className="text-primary">{getCategoryName(product)}</span>
          </p>
          
          <p className="text-gray-600 mb-4 flex-grow">
            {product.description.length > 150 
              ? `${product.description.substring(0, 150)}...` 
              : product.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              {getPriceDisplay(product)}
              <div className="text-sm">
                {product.isAvailable && product.stockQuantity > 0 ? (
                  <span className="text-green-500">In Stock</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="btn-primary py-2 px-4 flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
                disabled={!product.isAvailable || product.stockQuantity <= 0}
              >
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
              <Link 
                to={`/products/${product.id}`}
                className="btn-outline py-2 px-4 flex items-center justify-center"
              >
                <FiEye className="mr-2" /> View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  // Default grid view
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-card overflow-hidden flex flex-col"
    >
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img 
            src={getProductImage(product)} 
            alt={product.name} 
            className="w-full h-52 object-cover"
          />
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
          {product.newArrival && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
        </Link>
        <button 
          className="absolute top-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full text-gray-600 hover:text-red-500 transition-colors"
          aria-label="Add to wishlist"
        >
          <FiHeart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
          {renderRatingStars(product.rating)}
          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <h3 className="text-lg font-semibold text-dark mb-1">
          <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-xs text-gray-500 mb-2">
          {getCategoryName(product)}
        </p>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            {getPriceDisplay(product)}
            <div className="text-xs">
              {product.isAvailable && product.stockQuantity > 0 ? (
                <span className="text-green-500">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="btn btn-primary py-2 text-sm flex items-center justify-center"
              onClick={handleAddToCart}
              disabled={!product.isAvailable || product.stockQuantity <= 0}
            >
              <FiShoppingCart className="mr-1" /> Add
            </button>
            <Link 
              to={`/products/${product.id}`}
              className="btn btn-outline py-2 text-sm flex items-center justify-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;