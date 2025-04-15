import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { FiAlertCircle } from 'react-icons/fi';

const ShippingForm = () => {
  const { formData, handleChange, errors, STEPS, currentStep } = useCheckout();
  
  if (currentStep !== STEPS.SHIPPING_INFO) return null;
  
  return (
    <div className="checkout-step-content">
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.firstName}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.lastName}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.phone}
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="form-label">Street Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="House number and street name"
          className={`form-control ${errors.address ? 'border-red-500' : ''}`}
        />
        {errors.address && (
          <div className="text-red-500 text-sm mt-1 flex items-center">
            <FiAlertCircle className="mr-1" />
            {errors.address}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="apartment" className="form-label">Apartment, suite, etc. (optional)</label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="form-group">
          <label htmlFor="city" className="form-label">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`form-control ${errors.city ? 'border-red-500' : ''}`}
          />
          {errors.city && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.city}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="state" className="form-label">State/Province *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`form-control ${errors.state ? 'border-red-500' : ''}`}
          />
          {errors.state && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.state}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="zipCode" className="form-label">ZIP / Postal Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`form-control ${errors.zipCode ? 'border-red-500' : ''}`}
          />
          {errors.zipCode && (
            <div className="text-red-500 text-sm mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              {errors.zipCode}
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="country" className="form-label">Country *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="form-control"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="MX">Mexico</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-primary"
          />
          <span className="ml-2 text-gray-700">Save this information for next time</span>
        </label>
      </div>
    </div>
  );
};

export default ShippingForm; 