import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Form states
  const [formData, setFormData] = useState({
    // User info (pre-filled if authenticated)
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    
    // Shipping address
    shippingAddress: user?.address || '',
    shippingCity: user?.city || '',
    shippingState: user?.state || '',
    shippingZipCode: user?.zipCode || '',
    shippingCountry: user?.country || 'US',
    
    // Payment
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    
    // Shipping method
    shippingMethod: 'standard'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Information, 2: Payment, 3: Confirmation
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    // Step 1 validation (customer info)
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      
      if (!formData.shippingAddress) newErrors.shippingAddress = 'Address is required';
      if (!formData.shippingCity) newErrors.shippingCity = 'City is required';
      if (!formData.shippingState) newErrors.shippingState = 'State is required';
      if (!formData.shippingZipCode) newErrors.shippingZipCode = 'ZIP code is required';
    }
    
    // Step 2 validation (payment)
    if (step === 2 && formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) 
        newErrors.cardExpiry = 'Expiry date should be MM/YY';
      
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCvc)) 
        newErrors.cardCvc = 'CVC must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare order data
      const orderData = {
        // User info
        userId: isAuthenticated ? user.id : null,
        guestEmail: !isAuthenticated ? formData.email : null,
        guestPhone: !isAuthenticated ? formData.phone : null,
        
        // Address
        shippingAddress: formData.shippingAddress,
        shippingCity: formData.shippingCity,
        shippingState: formData.shippingState,
        shippingZipCode: formData.shippingZipCode,
        shippingCountry: formData.shippingCountry,
        
        // Order details
        paymentMethod: formData.paymentMethod,
        shippingMethod: formData.shippingMethod,
        totalAmount: parseFloat(getTotalPrice()),
        
        // Order items
        orderItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        }))
      };
      
      // Send order to API
      const config = isAuthenticated ? {
        headers: { Authorization: `Bearer ${user.token}` }
      } : {};
      
      const response = await axios.post(`${API_URL}/orders`, orderData, config);
      
      // Clear cart and navigate to success page
      clearCart();
      navigate('/checkout/success', { 
        state: { 
          orderId: response.data.id,
          orderNumber: response.data.id.substring(0, 8).toUpperCase() 
        } 
      });
      
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Error creating order. Please try again.'
      });
      setLoading(false);
    }
  };
  
  // Handle back button
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/cart');
    }
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      {/* Checkout steps */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Information</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirmation</div>
      </div>
      
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="checkout-step">
                <h2>Your Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} 
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} 
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
                
                <h2>Shipping Address</h2>
                
                <div className="form-group">
                  <label htmlFor="shippingAddress">Address</label>
                  <input 
                    type="text" 
                    id="shippingAddress" 
                    name="shippingAddress" 
                    value={formData.shippingAddress} 
                    onChange={handleChange} 
                    className={`form-control ${errors.shippingAddress ? 'is-invalid' : ''}`} 
                  />
                  {errors.shippingAddress && <div className="invalid-feedback">{errors.shippingAddress}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingCity">City</label>
                    <input 
                      type="text" 
                      id="shippingCity" 
                      name="shippingCity" 
                      value={formData.shippingCity} 
                      onChange={handleChange} 
                      className={`form-control ${errors.shippingCity ? 'is-invalid' : ''}`} 
                    />
                    {errors.shippingCity && <div className="invalid-feedback">{errors.shippingCity}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="shippingState">State</label>
                    <input 
                      type="text" 
                      id="shippingState" 
                      name="shippingState" 
                      value={formData.shippingState} 
                      onChange={handleChange} 
                      className={`form-control ${errors.shippingState ? 'is-invalid' : ''}`} 
                    />
                    {errors.shippingState && <div className="invalid-feedback">{errors.shippingState}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shippingZipCode">ZIP Code</label>
                    <input 
                      type="text" 
                      id="shippingZipCode" 
                      name="shippingZipCode" 
                      value={formData.shippingZipCode} 
                      onChange={handleChange} 
                      className={`form-control ${errors.shippingZipCode ? 'is-invalid' : ''}`} 
                    />
                    {errors.shippingZipCode && <div className="invalid-feedback">{errors.shippingZipCode}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="shippingCountry">Country</label>
                    <select 
                      id="shippingCountry" 
                      name="shippingCountry" 
                      value={formData.shippingCountry} 
                      onChange={handleChange} 
                      className="form-control"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                
                <h2>Shipping Method</h2>
                
                <div className="shipping-options">
                  <div className="shipping-option">
                    <input 
                      type="radio" 
                      id="standard" 
                      name="shippingMethod" 
                      value="standard" 
                      checked={formData.shippingMethod === 'standard'} 
                      onChange={handleChange} 
                    />
                    <label htmlFor="standard">
                      <span className="shipping-option-name">Standard Shipping</span>
                      <span className="shipping-option-price">Free</span>
                      <span className="shipping-option-description">5-7 business days</span>
                    </label>
                  </div>
                  
                  <div className="shipping-option">
                    <input 
                      type="radio" 
                      id="express" 
                      name="shippingMethod" 
                      value="express" 
                      checked={formData.shippingMethod === 'express'} 
                      onChange={handleChange} 
                    />
                    <label htmlFor="express">
                      <span className="shipping-option-name">Express Shipping</span>
                      <span className="shipping-option-price">$12.99</span>
                      <span className="shipping-option-description">2-3 business days</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="checkout-step">
                <h2>Payment Method</h2>
                
                <div className="payment-options">
                  <div className="payment-option">
                    <input 
                      type="radio" 
                      id="credit_card" 
                      name="paymentMethod" 
                      value="credit_card" 
                      checked={formData.paymentMethod === 'credit_card'} 
                      onChange={handleChange} 
                    />
                    <label htmlFor="credit_card">Credit Card</label>
                  </div>
                  
                  <div className="payment-option">
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="paymentMethod" 
                      value="paypal" 
                      checked={formData.paymentMethod === 'paypal'} 
                      onChange={handleChange} 
                    />
                    <label htmlFor="paypal">PayPal</label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit_card' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber" 
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                        placeholder="1234 5678 9012 3456" 
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} 
                      />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiry Date</label>
                        <input 
                          type="text" 
                          id="cardExpiry" 
                          name="cardExpiry" 
                          value={formData.cardExpiry} 
                          onChange={handleChange} 
                          placeholder="MM/YY" 
                          className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`} 
                        />
                        {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cardCvc">CVC</label>
                        <input 
                          type="text" 
                          id="cardCvc" 
                          name="cardCvc" 
                          value={formData.cardCvc} 
                          onChange={handleChange} 
                          placeholder="123" 
                          className={`form-control ${errors.cardCvc ? 'is-invalid' : ''}`} 
                        />
                        {errors.cardCvc && <div className="invalid-feedback">{errors.cardCvc}</div>}
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'paypal' && (
                  <div className="paypal-info">
                    <p>You will be redirected to PayPal to complete your purchase securely.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Step 3: Order Summary and Confirmation */}
            {step === 3 && (
              <div className="checkout-step">
                <h2>Review Your Order</h2>
                
                <div className="order-review">
                  <div className="review-section">
                    <h3>Shipping Information</h3>
                    <p>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.shippingAddress}<br />
                      {formData.shippingCity}, {formData.shippingState} {formData.shippingZipCode}<br />
                      {formData.shippingCountry}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}<br />
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                  </div>
                  
                  <div className="review-section">
                    <h3>Shipping Method</h3>
                    <p>
                      {formData.shippingMethod === 'standard' 
                        ? 'Standard Shipping (5-7 business days)' 
                        : 'Express Shipping (2-3 business days)'}
                    </p>
                  </div>
                  
                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <p>
                      {formData.paymentMethod === 'credit_card' 
                        ? `Credit Card ending in ${formData.cardNumber.slice(-4)}` 
                        : 'PayPal'}
                    </p>
                  </div>
                  
                  <div className="review-section">
                    <h3>Order Items</h3>
                    <ul className="order-items-list">
                      {cartItems.map(item => (
                        <li key={item.id} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-details">
                            {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {errors.submit && (
                  <div className="alert alert-danger">{errors.submit}</div>
                )}
              </div>
            )}
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleBack}
              >
                {step === 1 ? 'Back to Cart' : 'Back'}
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? 'Processing...' : step < 3 ? 'Continue' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/50x50?text=No+Image'} 
                    alt={item.name} 
                    className="item-thumbnail" 
                  />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="item-price">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getTotalPrice()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{formData.shippingMethod === 'standard' ? 'Free' : '$12.99'}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>
                ${
                  (parseFloat(getTotalPrice()) + 
                  (formData.shippingMethod === 'express' ? 12.99 : 0))
                  .toFixed(2)
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;