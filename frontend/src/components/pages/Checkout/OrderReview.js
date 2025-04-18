import React, { useContext } from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { CartContext } from '../../../context/CartContext';
import { FiCheckCircle, FiEdit2, FiCreditCard, FiTag } from 'react-icons/fi';
import { FaPaypal, FaApplePay } from 'react-icons/fa';

const OrderReview = () => {
  const { 
    formData, 
    STEPS, 
    currentStep, 
    goToStep, 
    deliveryMethods, 
    getDeliveryCost,
    isCouponApplied,
    getCouponDetails,
    getAppliedDiscount
  } = useCheckout();
  
  const { cartItems, getOriginalTotal } = useContext(CartContext);
  
  if (currentStep !== STEPS.REVIEW) return null;
  
  // Get selected delivery method
  const selectedDeliveryMethod = deliveryMethods.find(
    method => method.id === formData.deliveryMethod
  );
  
  // Calculate total
  const subtotal = parseFloat(getOriginalTotal());
  const deliveryCost = getDeliveryCost();
  const discount = getAppliedDiscount();
  const total = (subtotal - discount + deliveryCost).toFixed(2);
  
  // Format amount display based on type
  const formatDiscount = (coupon) => {
    if (!coupon) return '';
    
    if (coupon.type === 'percentage') {
      return `${(coupon.discount * 100).toFixed(0)}%`;
    } else {
      return `$${parseFloat(coupon.discount).toFixed(2)}`;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Order Review</h2>
        <FiCheckCircle className="text-success w-6 h-6" />
      </div>
      
      {/* Shipping address */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Shipping Address</h3>
          <button 
            onClick={() => goToStep(STEPS.SHIPPING_INFO)}
            className="text-primary text-sm flex items-center"
          >
            <FiEdit2 className="w-4 h-4 mr-1" /> Edit
          </button>
        </div>
        <div className="p-4 bg-light rounded text-sm">
          <p className="mb-1"><strong>{formData.firstName} {formData.lastName}</strong></p>
          <p className="mb-1">{formData.address}</p>
          {formData.apartment && <p className="mb-1">{formData.apartment}</p>}
          <p className="mb-1">{formData.city}, {formData.state} {formData.zipCode}</p>
          <p className="mb-1">{formData.country}</p>
          <p className="mb-1">Phone: {formData.phone}</p>
          <p>Email: {formData.email}</p>
        </div>
      </div>
      
      {/* Delivery method */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Delivery Method</h3>
          <button 
            onClick={() => goToStep(STEPS.DELIVERY_METHOD)}
            className="text-primary text-sm flex items-center"
          >
            <FiEdit2 className="w-4 h-4 mr-1" /> Edit
          </button>
        </div>
        <div className="p-4 bg-light rounded text-sm">
          <p className="font-medium">{selectedDeliveryMethod?.name}</p>
          <p className="text-gray-600">{selectedDeliveryMethod?.description}</p>
        </div>
      </div>
      
      {/* Payment method */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Payment Method</h3>
          <button 
            onClick={() => goToStep(STEPS.PAYMENT)}
            className="text-primary text-sm flex items-center"
          >
            <FiEdit2 className="w-4 h-4 mr-1" /> Edit
          </button>
        </div>
        <div className="p-4 bg-light rounded text-sm flex items-center">
          {formData.paymentMethod === 'credit_card' && (
            <>
              <FiCreditCard className="mr-2 w-5 h-5" />
              <div>
                <p className="font-medium">Credit Card</p>
                <p>
                  {formData.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(formData.cardNumber.length - 7)}
                </p>
              </div>
            </>
          )}
          
          {formData.paymentMethod === 'paypal' && (
            <>
              <FaPaypal className="mr-2 w-5 h-5 text-primary" />
              <p className="font-medium">PayPal</p>
            </>
          )}
          
          {formData.paymentMethod === 'apple_pay' && (
            <>
              <FaApplePay className="mr-2 w-5 h-5" />
              <p className="font-medium">Apple Pay</p>
            </>
          )}
        </div>
      </div>
      
      {/* Order items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="divide-y">
          {cartItems.map(item => (
            <div key={item.id} className="py-3 flex items-center">
              <div className="w-16 h-16 mr-4 bg-light rounded flex-shrink-0 overflow-hidden">
                <img 
                  src={item.imageUrl || `${process.env.REACT_APP_PLACEHOLDER_IMAGE_URL}/300x300?text=Product`} 
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium text-dark">{item.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="font-medium">
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order totals */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {isCouponApplied() && (
          <div className="flex justify-between mb-2 text-green-600">
            <span className="flex items-center">
              <FiTag className="mr-1" /> Discount
              <span className="text-xs ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {getCouponDetails().code} ({formatDiscount(getCouponDetails())})
              </span>
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span>{deliveryCost > 0 ? `$${deliveryCost.toFixed(2)}` : 'Free'}</span>
        </div>
        
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview; 