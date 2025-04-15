import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * Toast component for displaying temporary notifications
 */
const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'bottom-right',
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Handle auto-close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300); // Wait for fade-out animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  // Types with corresponding styles
  const typeStyles = {
    success: 'bg-success text-white',
    error: 'bg-error text-white',
    warning: 'bg-warning text-white',
    info: 'bg-primary text-white',
  };
  
  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };
  
  // Animation classes
  const animationClasses = isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-2';
  
  // Close handler
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };
  
  // Combine all classes
  const toastClasses = `
    fixed z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 max-w-sm
    ${typeStyles[type]}
    ${positionStyles[position]}
    ${animationClasses}
  `.trim().replace(/\s+/g, ' ');

  return createPortal(
    <div className={toastClasses} role="alert">
      <div className="flex items-center justify-between">
        <div className="mr-4">{message}</div>
        <button 
          className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
  onClose: PropTypes.func,
};

/**
 * ToastContainer component to manage multiple toasts
 */
export const ToastContainer = ({ toasts = [], removeToast }) => {
  if (toasts.length === 0) return null;
  
  return createPortal(
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>,
    document.body
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
      duration: PropTypes.number,
      position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),
    })
  ),
  removeToast: PropTypes.func.isRequired,
};

export default Toast; 