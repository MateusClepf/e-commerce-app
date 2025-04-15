import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// Sample coupon codes for demo purposes
const VALID_COUPONS = [
  { code: 'WELCOME10', discount: 0.1, type: 'percentage', maxDiscount: 50 },
  { code: 'SUMMER25', discount: 0.25, type: 'percentage', maxDiscount: 100 },
  { code: 'FREESHIP', discount: 10, type: 'fixed' },
  { code: 'FLAT20', discount: 20, type: 'fixed' }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [recentlyAddedItem, setRecentlyAddedItem] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  
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
  
  // Apply coupon code
  const applyCoupon = (code) => {
    const trimmedCode = code.trim().toUpperCase();
    
    if (!trimmedCode) {
      setCouponError('Please enter a coupon code');
      return false;
    }
    
    const coupon = VALID_COUPONS.find(
      coupon => coupon.code === trimmedCode
    );
    
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode('');
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid coupon code');
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