import React from 'react';
import PropTypes from 'prop-types';

/**
 * Input component that implements the design system's input styles
 */
const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  disabled = false,
  required = false,
  helperText = '',
  className = '',
  fullWidth = true,
  ...props
}) => {
  // Base classes for all inputs
  const baseClasses = 'block px-3 py-2 text-base border rounded focus:outline-none focus:ring-1 transition-all duration-300';
  
  // Error state classes
  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-error/50 text-error'
    : 'border-gray-300 focus:border-primary focus:ring-primary/50';
  
  // Disabled state
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '';
  
  // Width
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block mb-2 font-medium ${error ? 'text-error' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Input; 