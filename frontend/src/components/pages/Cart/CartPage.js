import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { FiShoppingCart, FiTag, FiX, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './CartPage.css';
import PageTransition from '../../shared/PageTransition';
import { cartItemVariants, AnimatedButton } from '../../../components/ui';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    getOriginalTotal,
    getDiscountAmount,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    couponError,
    removeAllFromCart
  } = useContext(CartContext);
  const navigate = useNavigate();
  const [isCouponExpanded, setIsCouponExpanded] = useState(false);
  
  const handleQuantityChange = (productId, quantity) => {
    updateQuantity(productId, parseInt(quantity));
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <FiShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }
  
  const discountAmount = getDiscountAmount();
  
  return (
    <PageTransition>
      <div className="cart-page container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Cart header - desktop only */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              {/* Cart items */}
              <div className="divide-y">
                <AnimatePresence>
                  {cartItems.map(item => (
                    <motion.div 
                      key={item.id + item.size + item.color}
                      variants={cartItemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                    >
                      {/* Product info */}
                      <div className="md:col-span-6 flex mb-4 md:mb-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.imageUrl || `https://via.placeholder.com/80?text=No+Image`} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">
                            <Link to={`/products/${item.id}`} className="hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors mt-1 md:hidden flex items-center"
                          >
                            <FiX className="w-3 h-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                        <div>${parseFloat(item.price).toFixed(2)}</div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Quantity:</div>
                        <div className="inline-flex items-center border rounded-md">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
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
                            className="w-10 h-8 text-center border-x focus:outline-none"
                          />
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                            onClick={() => handleQuantityChange(item.id, Math.min(item.stockQuantity || 10, item.quantity + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 md:text-right">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                        <div className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="hidden md:inline-flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors mt-1"
                        >
                          <FiX className="w-3 h-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/products" className="text-primary hover:underline inline-flex items-center">
                ← Continue Shopping
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Coupon code */}
              <div className="mb-6">
                <button 
                  className="flex items-center text-primary hover:underline mb-2"
                  onClick={() => setIsCouponExpanded(!isCouponExpanded)}
                >
                  <FiTag className="mr-2" />
                  {appliedCoupon ? 'Applied Coupon' : 'Add Coupon Code'} 
                </button>
                
                <AnimatePresence>
                  {isCouponExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-md">
                          <div className="flex items-center">
                            <FiCheck className="text-green-500 mr-2" />
                            <div>
                              <div className="font-medium">{appliedCoupon.code}</div>
                              <div className="text-xs text-green-700">
                                {appliedCoupon.type === 'percentage' 
                                  ? `${appliedCoupon.discount * 100}% off`
                                  : `$${appliedCoupon.discount} off`}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="Enter coupon code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="form-control rounded-r-none flex-1"
                            />
                            <button
                              onClick={handleApplyCoupon}
                              className="bg-primary hover:bg-primary-dark text-white px-4 rounded-r-md transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                          
                          {couponError && (
                            <div className="text-sm text-red-500 mt-1">{couponError}</div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-2 border-t border-b py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({cartItems.reduce((total, item) => total + item.quantity, 0)}):</span>
                  <span>${getOriginalTotal()}</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="flex justify-between mt-4 mb-6 text-lg font-semibold">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
              
              <button
                className="w-full btn btn-primary py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-6 text-xs text-gray-500 space-y-2">
                <p>
                  <strong>Shipping:</strong> Free standard shipping on all orders.
                </p>
                <p>
                  <strong>Returns:</strong> Easy 30-day returns. See our <Link to="/returns" className="text-primary hover:underline">return policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CartPage;