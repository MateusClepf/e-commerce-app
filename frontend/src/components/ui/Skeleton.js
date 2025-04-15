import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton component for displaying loading states
 */
const Skeleton = ({
  variant = 'rectangle',
  width,
  height,
  className = '',
  ...props
}) => {
  // Base classes for all skeletons
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  // Handle variant-specific styling
  let variantClasses = '';
  
  if (variant === 'circle') {
    variantClasses = 'rounded-full';
  } else if (variant === 'text') {
    variantClasses = 'h-4 w-full';
  }
  
  // Combine all classes
  const skeletonClasses = `
    ${baseClasses}
    ${variantClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div 
      className={skeletonClasses}
      style={{ 
        width: width, 
        height: height 
      }}
      {...props}
    />
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['rectangle', 'circle', 'text']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

/**
 * ProductCardSkeleton component for displaying a loading state for product cards
 */
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <Skeleton variant="rectangle" height="200px" width="100%" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
        <div className="pt-3">
          <Skeleton variant="rectangle" height="40px" width="100%" />
        </div>
      </div>
    </div>
  );
};

/**
 * TextRowSkeleton component for displaying multiple rows of text skeletons
 */
export const TextRowsSkeleton = ({ rows = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton 
          key={index} 
          variant="text" 
          width={`${Math.floor(Math.random() * 50) + 50}%`} 
        />
      ))}
    </div>
  );
};

TextRowsSkeleton.propTypes = {
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Skeleton; 