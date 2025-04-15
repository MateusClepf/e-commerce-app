import React from 'react';
import Skeleton from './Skeleton';

/**
 * ProductCardSkeleton component for displaying a loading state for product cards
 */
const ProductCardSkeleton = () => {
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

export default ProductCardSkeleton; 