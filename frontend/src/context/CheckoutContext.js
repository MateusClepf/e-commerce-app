import React, { createContext, useState, useContext } from 'react';
import { CartContext } from './CartContext';

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  
  // Checkout steps
  const STEPS = {
    SHIPPING_INFO: 'shipping_info',
    DELIVERY_METHOD: 'delivery_method',
    PAYMENT: 'payment',
    REVIEW: 'review'
  };
  
  // Step order for navigation
  const STEP_ORDER = [
    STEPS.SHIPPING_INFO,
    STEPS.DELIVERY_METHOD,
    STEPS.PAYMENT,
    STEPS.REVIEW
  ];
  
  // State for checkout process
  const [currentStep, setCurrentStep] = useState(STEPS.SHIPPING_INFO);
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: false,
    
    // Delivery method
    deliveryMethod: 'standard',
    
    // Payment
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    
    // Additional info
    orderNotes: ''
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Shipping methods
  const deliveryMethods = [
    { id: 'standard', name: 'Standard Shipping', description: '3-5 business days', price: 0 },
    { id: 'express', name: 'Express Shipping', description: '1-2 business days', price: 15 },
    { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day', price: 25 }
  ];
  
  // Payment methods
  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', description: 'Pay with Visa, Mastercard, etc.' },
    { id: 'paypal', name: 'PayPal', description: 'Fast, secure PayPal payment' },
    { id: 'apple_pay', name: 'Apple Pay', description: 'Pay with Apple Pay' }
  ];
  
  // Handle form data change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === STEPS.SHIPPING_INFO) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) 
        newErrors.email = 'Please enter a valid email address';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === STEPS.PAYMENT && formData.paymentMethod === 'credit_card') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry))
        newErrors.cardExpiry = 'Please use MM/YY format';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCvc))
        newErrors.cardCvc = 'CVC must be 3-4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Go to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      const currentIndex = STEP_ORDER.indexOf(currentStep);
      if (currentIndex < STEP_ORDER.length - 1) {
        setCurrentStep(STEP_ORDER[currentIndex + 1]);
        return true;
      }
    }
    return false;
  };
  
  // Go to previous step
  const prevStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
      return true;
    }
    return false;
  };
  
  // Go to specific step
  const goToStep = (step) => {
    if (STEP_ORDER.includes(step)) {
      // Validate all previous steps
      const targetIndex = STEP_ORDER.indexOf(step);
      const currentIndex = STEP_ORDER.indexOf(currentStep);
      
      // Only allow going back or to validated steps
      if (targetIndex <= currentIndex) {
        setCurrentStep(step);
        return true;
      }
    }
    return false;
  };
  
  // Calculate delivery cost based on method
  const getDeliveryCost = () => {
    const method = deliveryMethods.find(m => m.id === formData.deliveryMethod);
    return method ? method.price : 0;
  };
  
  // Calculate order total (including delivery)
  const getOrderTotal = () => {
    const subtotal = parseFloat(getTotalPrice());
    const deliveryCost = getDeliveryCost();
    return (subtotal + deliveryCost).toFixed(2);
  };
  
  // Place order
  const placeOrder = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        // In a real app, this would connect to an API
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        // TODO: Replace with real API call
        const orderData = {
          ...formData,
          items: cartItems,
          subtotal: getTotalPrice(),
          deliveryCost: getDeliveryCost(),
          total: getOrderTotal(),
          orderDate: new Date().toISOString(),
          orderNumber: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`
        };
        
        // Clear cart
        clearCart();
        
        // Return order data for confirmation page
        return orderData;
      } catch (error) {
        setErrors({ submit: 'Failed to place order. Please try again.' });
        return null;
      } finally {
        setIsSubmitting(false);
      }
    }
    return null;
  };
  
  // Reset checkout state
  const resetCheckout = () => {
    setCurrentStep(STEPS.SHIPPING_INFO);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      saveInfo: false,
      deliveryMethod: 'standard',
      paymentMethod: 'credit_card',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvc: '',
      orderNotes: ''
    });
    setErrors({});
  };
  
  return (
    <CheckoutContext.Provider value={{
      // Steps
      STEPS,
      currentStep,
      setCurrentStep,
      nextStep,
      prevStep,
      goToStep,
      
      // Form data
      formData,
      setFormData,
      handleChange,
      errors,
      
      // Shipping & payment methods
      deliveryMethods,
      paymentMethods,
      
      // Order calculations
      getDeliveryCost,
      getOrderTotal,
      
      // Order submission
      isSubmitting,
      placeOrder,
      resetCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext); 