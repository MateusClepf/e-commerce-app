import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

// Remove hardcoded coupon codes
// const VALID_COUPONS = [...]

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [recentlyAddedItem, setRecentlyAddedItem] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  
  // API URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    const storedCoupon = localStorage.getItem('coupon');
    if (storedCoupon) {
      setAppliedCoupon(JSON.parse(storedCoupon));
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Save applied coupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('coupon');
    }
  }, [appliedCoupon]);
  
  // Clear recently added item after 3 seconds
  useEffect(() => {
    if (recentlyAddedItem) {
      const timer = setTimeout(() => {
        setRecentlyAddedItem(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [recentlyAddedItem]);
  
  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      let updatedItems;
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        
        // Set as recently added
        setRecentlyAddedItem({
          ...updatedItems[existingItemIndex],
          quantity: quantity, // Just the quantity that was added
          isUpdate: true
        });
        
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        const newItem = { ...product, quantity };
        
        // Set as recently added
        setRecentlyAddedItem({
          ...newItem,
          isUpdate: false
        });
        
        return [...prevItems, newItem];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };
  
  // Apply coupon code - updated to use API
  const applyCoupon = async (code) => {
    const trimmedCode = code.trim().toUpperCase();
    
    if (!trimmedCode) {
      setCouponError('Please enter a coupon code');
      return false;
    }
    
    try {
      setValidatingCoupon(true);
      setCouponError('');
      
      // Call the coupon validation API
      const response = await axios.get(`${API_URL}/coupons/validate/${trimmedCode}`);
      
      if (response.data && response.data.valid) {
        setAppliedCoupon(response.data.coupon);
        setCouponCode('');
        setCouponError('');
        setValidatingCoupon(false);
        return true;
      } else {
        setCouponError('Invalid coupon code');
        setValidatingCoupon(false);
        return false;
      }
    } catch (error) {
      // Handle error response
      const errorMessage = error.response?.data?.message || 'Error validating coupon';
      setCouponError(errorMessage);
      setValidatingCoupon(false);
      return false;
    }
  };
  
  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
  };
  
  // Calculate subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  };
  
  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = getSubtotal();
    
    if (appliedCoupon.type === 'percentage') {
      const discountAmount = subtotal * appliedCoupon.discount;
      return appliedCoupon.maxDiscount
        ? Math.min(discountAmount, appliedCoupon.maxDiscount)
        : discountAmount;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };
  
  // Calculate total price (with discount)
  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    return (subtotal - discount).toFixed(2);
  };
  
  // Get original total (without discount)
  const getOriginalTotal = () => {
    return getSubtotal().toFixed(2);
  };
  
  // Count items in cart
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      couponCode,
      setCouponCode,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      couponError,
      validatingCoupon,
      getTotalPrice,
      getOriginalTotal,
      getDiscountAmount,
      getItemCount,
      recentlyAddedItem
    }}>
      {children}
    </CartContext.Provider>
  );
};