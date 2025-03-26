import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, parseInt(quantity));
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {/* Cart table header */}
          <div className="cart-header">
            <div className="cart-header-item product-col">Product</div>
            <div className="cart-header-item price-col">Price</div>
            <div className="cart-header-item quantity-col">Quantity</div>
            <div className="cart-header-item total-col">Total</div>
            <div className="cart-header-item actions-col">Actions</div>
          </div>
          
          {/* Cart items */}
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="product-col">
                <div className="product-details">
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'} 
                    alt={item.name} 
                    className="product-thumbnail" 
                  />
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="price-col">
                ${parseFloat(item.price).toFixed(2)}
              </div>
              
              <div className="quantity-col">
                <div className="quantity-control">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={item.stockQuantity || 10} 
                    value={item.quantity} 
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                    className="quantity-input"
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(item.id, Math.min(item.stockQuantity || 10, item.quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="total-col">
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </div>
              
              <div className="actions-col">
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Items:</span>
            <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotalPrice()}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${getTotalPrice()}</span>
          </div>
          
          <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;