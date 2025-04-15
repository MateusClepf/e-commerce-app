import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';
import ShippingForm from './ShippingForm';
import DeliveryMethod from './DeliveryMethod';
import PaymentMethod from './PaymentMethod';
import OrderReview from './OrderReview';
import { FiChevronRight, FiChevronLeft, FiCheck, FiClock, FiCreditCard, FiPackage } from 'react-icons/fi';
import './CheckoutPage.css';
import PageTransition from '../../shared/PageTransition';

const CheckoutPage = () => {
  const { cartItems, getOriginalTotal } = useContext(CartContext);
  const { 
    STEPS, 
    currentStep, 
    nextStep, 
    prevStep, 
    goToStep, 
    isSubmitting, 
    placeOrder,
    getDeliveryCost,
    getOrderTotal
  } = useCheckout();
  
  const navigate = useNavigate();
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  // Handle checkout completion
  const handleCompleteCheckout = async () => {
    const orderData = await placeOrder();
    if (orderData) {
      // Navigate to confirmation page with order data
      navigate('/checkout/confirmation', { state: { order: orderData } });
    }
  };
  
  // Determine active step for the progress indicator
  const isStepComplete = (step) => {
    const stepOrder = [
      STEPS.SHIPPING_INFO,
      STEPS.DELIVERY_METHOD,
      STEPS.PAYMENT,
      STEPS.REVIEW
    ];
    return stepOrder.indexOf(step) < stepOrder.indexOf(currentStep);
  };
  
  const isStepActive = (step) => currentStep === step;
  
  // Get the button text based on current step
  const getButtonText = () => {
    switch (currentStep) {
      case STEPS.SHIPPING_INFO:
        return 'Continue to Shipping';
      case STEPS.DELIVERY_METHOD:
        return 'Continue to Payment';
      case STEPS.PAYMENT:
        return 'Review Order';
      case STEPS.REVIEW:
        return 'Place Order';
      default:
        return 'Continue';
    }
  };
  
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <PageTransition>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <h1 className="text-2xl font-bold text-center mb-8">Checkout</h1>
          
          {/* Progress steps */}
          <div className="hidden md:flex justify-between mb-8 max-w-3xl mx-auto">
            <button 
              onClick={() => goToStep(STEPS.SHIPPING_INFO)}
              className={`checkout-step-indicator ${isStepActive(STEPS.SHIPPING_INFO) ? 'active' : ''} ${isStepComplete(STEPS.SHIPPING_INFO) ? 'completed' : ''}`}
              disabled={!isStepComplete(STEPS.SHIPPING_INFO) && !isStepActive(STEPS.SHIPPING_INFO)}
            >
              <div className="step-icon">
                {isStepComplete(STEPS.SHIPPING_INFO) ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <span>1</span>
                )}
              </div>
              <span>Shipping</span>
            </button>
            
            <div className={`step-connector ${isStepComplete(STEPS.SHIPPING_INFO) ? 'completed' : ''}`}></div>
            
            <button 
              onClick={() => goToStep(STEPS.DELIVERY_METHOD)}
              className={`checkout-step-indicator ${isStepActive(STEPS.DELIVERY_METHOD) ? 'active' : ''} ${isStepComplete(STEPS.DELIVERY_METHOD) ? 'completed' : ''}`}
              disabled={!isStepComplete(STEPS.DELIVERY_METHOD) && !isStepActive(STEPS.DELIVERY_METHOD)}
            >
              <div className="step-icon">
                {isStepComplete(STEPS.DELIVERY_METHOD) ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <FiPackage className="w-5 h-5" />
                )}
              </div>
              <span>Delivery</span>
            </button>
            
            <div className={`step-connector ${isStepComplete(STEPS.DELIVERY_METHOD) ? 'completed' : ''}`}></div>
            
            <button 
              onClick={() => goToStep(STEPS.PAYMENT)}
              className={`checkout-step-indicator ${isStepActive(STEPS.PAYMENT) ? 'active' : ''} ${isStepComplete(STEPS.PAYMENT) ? 'completed' : ''}`}
              disabled={!isStepComplete(STEPS.PAYMENT) && !isStepActive(STEPS.PAYMENT)}
            >
              <div className="step-icon">
                {isStepComplete(STEPS.PAYMENT) ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <FiCreditCard className="w-5 h-5" />
                )}
              </div>
              <span>Payment</span>
            </button>
            
            <div className={`step-connector ${isStepComplete(STEPS.PAYMENT) ? 'completed' : ''}`}></div>
            
            <button 
              onClick={() => goToStep(STEPS.REVIEW)}
              className={`checkout-step-indicator ${isStepActive(STEPS.REVIEW) ? 'active' : ''} ${isStepComplete(STEPS.REVIEW) ? 'completed' : ''}`}
              disabled={!isStepComplete(STEPS.REVIEW) && !isStepActive(STEPS.REVIEW)}
            >
              <div className="step-icon">
                <FiClock className="w-5 h-5" />
              </div>
              <span>Review</span>
            </button>
          </div>
          
          {/* Mobile steps indicator */}
          <div className="md:hidden mb-6">
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="text-gray-500 text-sm">
                Step {
                  currentStep === STEPS.SHIPPING_INFO ? '1' :
                  currentStep === STEPS.DELIVERY_METHOD ? '2' :
                  currentStep === STEPS.PAYMENT ? '3' : '4'
                } of 4
              </p>
              <p className="font-medium">
                {currentStep === STEPS.SHIPPING_INFO && 'Shipping Information'}
                {currentStep === STEPS.DELIVERY_METHOD && 'Delivery Method'}
                {currentStep === STEPS.PAYMENT && 'Payment Details'}
                {currentStep === STEPS.REVIEW && 'Review Order'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <ShippingForm />
                <DeliveryMethod />
                <PaymentMethod />
                <OrderReview />
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`btn btn-outline flex items-center ${
                      currentStep === STEPS.SHIPPING_INFO ? 'invisible' : ''
                    }`}
                  >
                    <FiChevronLeft className="mr-1" />
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={currentStep === STEPS.REVIEW ? handleCompleteCheckout : nextStep}
                    className={`btn btn-primary flex items-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {getButtonText()}
                    {currentStep !== STEPS.REVIEW && <FiChevronRight className="ml-1" />}
                    {isSubmitting && (
                      <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4 divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="py-3 flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.imageUrl || `https://via.placeholder.com/64?text=No+Image`} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-b py-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getOriginalTotal()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {getDeliveryCost() === 0 
                        ? 'Free' 
                        : `$${getDeliveryCost().toFixed(2)}`}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 mb-2 text-lg font-semibold">
                  <span>Total</span>
                  <span>${getOrderTotal()}</span>
                </div>
                
                <div className="text-xs text-gray-500">
                  Taxes calculated at checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutPage;