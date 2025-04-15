import React, { useContext } from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { CartContext } from '../../../context/CartContext';
import { FiCheckCircle, FiEdit2, FiCreditCard } from 'react-icons/fi';
import { FaPaypal, FaApplePay } from 'react-icons/fa';

const OrderReview = () => {
  const { 
    formData, 
    STEPS, 
    currentStep, 
    goToStep, 
    deliveryMethods, 
    getDeliveryCost 
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
  const total = (subtotal + deliveryCost).toFixed(2);
  
  return (
    <div className="checkout-step-content">
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
      <p className="text-gray-600 mb-6">
        Please review your order details before placing your order.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Shipping information */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Shipping Information</h3>
            <button 
              type="button"
              onClick={() => goToStep(STEPS.SHIPPING_INFO)}
              className="text-primary text-sm flex items-center hover:underline"
            >
              <FiEdit2 className="w-3 h-3 mr-1" />
              Edit
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-medium">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="mt-1">{formData.address}</p>
            {formData.apartment && <p>{formData.apartment}</p>}
            <p>
              {formData.city}, {formData.state} {formData.zipCode}
            </p>
            <p>{formData.country}</p>
            <p className="mt-2">{formData.phone}</p>
            <p>{formData.email}</p>
          </div>
        </div>
        
        {/* Delivery method */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Delivery Method</h3>
            <button 
              type="button"
              onClick={() => goToStep(STEPS.DELIVERY_METHOD)}
              className="text-primary text-sm flex items-center hover:underline"
            >
              <FiEdit2 className="w-3 h-3 mr-1" />
              Edit
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{selectedDeliveryMethod.name}</p>
                <p className="text-gray-600 mt-1">{selectedDeliveryMethod.description}</p>
              </div>
              <div className="font-medium">
                {selectedDeliveryMethod.price === 0 
                  ? 'Free' 
                  : `$${selectedDeliveryMethod.price.toFixed(2)}`}
              </div>
            </div>
            
            {formData.orderNotes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="font-medium">Order Notes:</p>
                <p className="text-gray-600 mt-1">{formData.orderNotes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Payment method */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Payment Method</h3>
            <button 
              type="button"
              onClick={() => goToStep(STEPS.PAYMENT)}
              className="text-primary text-sm flex items-center hover:underline"
            >
              <FiEdit2 className="w-3 h-3 mr-1" />
              Edit
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <div className="flex items-center">
              {formData.paymentMethod === 'credit_card' && (
                <>
                  <FiCreditCard className="text-gray-700 mr-2" />
                  <div>
                    <p className="font-medium">Credit Card</p>
                    <p className="text-gray-600">
                      **** **** **** {formData.cardNumber.slice(-4)}
                    </p>
                  </div>
                </>
              )}
              
              {formData.paymentMethod === 'paypal' && (
                <>
                  <FaPaypal className="text-blue-600 mr-2 text-xl" />
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-gray-600">You'll be redirected to PayPal</p>
                  </div>
                </>
              )}
              
              {formData.paymentMethod === 'apple_pay' && (
                <>
                  <FaApplePay className="text-gray-800 mr-2 text-xl" />
                  <div>
                    <p className="font-medium">Apple Pay</p>
                    <p className="text-gray-600">Pay with Apple Pay</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Order items */}
      <h3 className="font-medium mb-3">Order Items</h3>
      <div className="border rounded-lg overflow-hidden mb-6">
        <div className="divide-y">
          {cartItems.map(item => (
            <div key={item.id} className="p-4 flex items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={item.imageUrl || `https://via.placeholder.com/64?text=No+Image`} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="ml-4 flex-grow">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span>
              {deliveryCost === 0 
                ? 'Free' 
                : `$${deliveryCost.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 flex items-start">
        <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-sm text-green-800">
          By placing your order, you agree to our 
          <a href="/terms" className="text-primary hover:underline ml-1">Terms and Conditions</a> and
          <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default OrderReview; 