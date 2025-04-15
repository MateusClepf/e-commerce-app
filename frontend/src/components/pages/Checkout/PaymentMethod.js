import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { FiAlertCircle, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import { FaPaypal, FaApplePay } from 'react-icons/fa';

const PaymentMethod = () => {
  const { formData, handleChange, errors, paymentMethods, STEPS, currentStep } = useCheckout();
  
  if (currentStep !== STEPS.PAYMENT) return null;
  
  return (
    <div className="checkout-step-content">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <p className="text-gray-600 mb-6">
        All transactions are secure and encrypted.
      </p>
      
      <div className="space-y-4 mb-6">
        {paymentMethods.map(method => (
          <label 
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors 
              ${formData.paymentMethod === method.id 
                ? 'border-primary bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={formData.paymentMethod === method.id}
              onChange={handleChange}
              className="form-radio h-5 w-5 text-primary"
            />
            
            <div className="ml-4 flex-grow">
              <div className="flex items-center">
                <span className="font-medium">{method.name}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {method.description}
              </div>
            </div>
            
            <div className="ml-2 text-xl">
              {method.id === 'credit_card' && <FiCreditCard />}
              {method.id === 'paypal' && <FaPaypal className="text-blue-600" />}
              {method.id === 'apple_pay' && <FaApplePay />}
            </div>
            
            {formData.paymentMethod === method.id && (
              <div className="ml-2 text-primary">
                <FiCheckCircle className="w-5 h-5" />
              </div>
            )}
          </label>
        ))}
      </div>
      
      {/* Credit card form */}
      {formData.paymentMethod === 'credit_card' && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-4">Card Details</h3>
          
          <div className="mb-4">
            <label htmlFor="cardName" className="form-label">Name on Card *</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Smith"
              className={`form-control ${errors.cardName ? 'border-red-500' : ''}`}
            />
            {errors.cardName && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <FiAlertCircle className="mr-1" />
                {errors.cardName}
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="cardNumber" className="form-label">Card Number *</label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={`form-control pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
              />
              <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <FiAlertCircle className="mr-1" />
                {errors.cardNumber}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="cardExpiry" className="form-label">Expiry Date *</label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
                className={`form-control ${errors.cardExpiry ? 'border-red-500' : ''}`}
              />
              {errors.cardExpiry && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {errors.cardExpiry}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="cardCvc" className="form-label">CVC/CVV *</label>
              <input
                type="text"
                id="cardCvc"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                className={`form-control ${errors.cardCvc ? 'border-red-500' : ''}`}
              />
              {errors.cardCvc && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  {errors.cardCvc}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* PayPal info */}
      {formData.paymentMethod === 'paypal' && (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
          You will be redirected to PayPal to complete your payment after reviewing your order.
        </div>
      )}
      
      {/* Apple Pay info */}
      {formData.paymentMethod === 'apple_pay' && (
        <div className="bg-gray-50 text-gray-800 p-4 rounded-lg text-sm">
          You will be prompted to confirm payment with Apple Pay after reviewing your order.
        </div>
      )}
    </div>
  );
};

export default PaymentMethod; 