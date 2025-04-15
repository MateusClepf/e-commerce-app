import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { FiTruck, FiClock, FiCheckCircle } from 'react-icons/fi';

const DeliveryMethod = () => {
  const { formData, handleChange, deliveryMethods, STEPS, currentStep } = useCheckout();
  
  if (currentStep !== STEPS.DELIVERY_METHOD) return null;
  
  return (
    <div className="checkout-step-content">
      <h2 className="text-xl font-semibold mb-4">Delivery Method</h2>
      <p className="text-gray-600 mb-6">
        Please select the preferred shipping method for your order.
      </p>
      
      <div className="space-y-4">
        {deliveryMethods.map(method => (
          <label 
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors 
              ${formData.deliveryMethod === method.id 
                ? 'border-primary bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="deliveryMethod"
              value={method.id}
              checked={formData.deliveryMethod === method.id}
              onChange={handleChange}
              className="form-radio h-5 w-5 text-primary"
            />
            
            <div className="ml-4 flex-grow">
              <div className="flex items-center">
                <span className="font-medium">{method.name}</span>
                {method.price === 0 ? (
                  <span className="ml-2 text-sm text-green-600 font-medium">Free</span>
                ) : (
                  <span className="ml-2 text-sm text-gray-600">${method.price.toFixed(2)}</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {method.description}
              </div>
            </div>
            
            <div className="ml-2">
              {method.id === 'standard' && <FiTruck className="text-gray-500" />}
              {method.id === 'express' && <FiClock className="text-gray-500" />}
              {method.id === 'overnight' && <FiCheckCircle className="text-gray-500" />}
            </div>
            
            {formData.deliveryMethod === method.id && (
              <div className="ml-2 text-primary">
                <FiCheckCircle className="w-5 h-5" />
              </div>
            )}
          </label>
        ))}
      </div>
      
      <div className="mt-6">
        <label htmlFor="orderNotes" className="form-label">Order Notes (Optional)</label>
        <textarea
          id="orderNotes"
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleChange}
          placeholder="Special instructions for delivery"
          className="form-control h-24"
        ></textarea>
      </div>
    </div>
  );
};

export default DeliveryMethod; 