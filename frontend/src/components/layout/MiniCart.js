import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MiniCart = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getItemCount, recentlyAddedItem } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemoveItem = (event, productId) => {
    event.stopPropagation();
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (event, productId, newQuantity) => {
    event.stopPropagation();
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const goToCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Your Cart ({getItemCount()})</h3>
        {cartItems.length > 0 && (
          <button
            onClick={goToCart}
            className="text-sm text-primary hover:underline"
          >
            View Full Cart
          </button>
        )}
      </div>
      
      {/* Recently Added Notification */}
      <AnimatePresence>
        {recentlyAddedItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 rounded-md p-3 mb-3 border border-green-100"
          >
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-1 mr-2">
                <FiCheck className="text-green-500 w-4 h-4" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-green-800">
                  {recentlyAddedItem.isUpdate 
                    ? `Added ${recentlyAddedItem.quantity} more ${recentlyAddedItem.name} to your cart`
                    : `${recentlyAddedItem.name} added to your cart`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {cartItems.length === 0 ? (
        <div className="py-8 text-center">
          <FiShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">Your cart is empty</p>
          <button
            onClick={() => {
              onClose();
              navigate('/products');
            }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="max-h-60 overflow-y-auto mb-4">
            <AnimatePresence>
              {cartItems.slice(0, 5).map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  layout
                  className={`flex items-center py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-md transition-colors ${
                    recentlyAddedItem && recentlyAddedItem.id === item.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div 
                    className="h-14 w-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-3"
                  >
                    <img 
                      src={item.imageUrl || `https://via.placeholder.com/56?text=No+Image`} 
                      alt={item.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium line-clamp-1">
                      <Link 
                        to={`/products/${item.id}`} 
                        onClick={onClose}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center border rounded-md mr-2">
                        <button 
                          onClick={(e) => handleUpdateQuantity(e, item.id, item.quantity - 1)}
                          className="px-1 py-0.5 text-gray-500 hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <motion.span 
                          key={item.quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-xs px-1"
                        >
                          {item.quantity}
                        </motion.span>
                        <button 
                          onClick={(e) => handleUpdateQuantity(e, item.id, item.quantity + 1)}
                          className="px-1 py-0.5 text-gray-500 hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">
                        ${parseFloat(item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => handleRemoveItem(e, item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {cartItems.length > 5 && (
              <div className="py-2 text-center text-sm text-gray-500">
                + {cartItems.length - 5} more items
              </div>
            )}
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <motion.div 
              className="flex justify-between mb-2"
              key={getTotalPrice()}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">${getTotalPrice()}</span>
            </motion.div>
            <p className="text-xs text-gray-500 mb-3">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex space-x-2">
              <button
                onClick={goToCart}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-md transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart; 