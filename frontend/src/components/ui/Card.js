import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component that implements the design system's card styles
 */
const Card = ({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  // Base classes for card
  const baseClasses = 'bg-white rounded-lg shadow-card overflow-hidden';
  
  // Hover effect classes
  const hoverClasses = hoverable ? 'transition-transform duration-300 hover:-translate-y-1' : '';
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

/**
 * Card.Header component for the header section of a card
 */
const CardHeader = ({ children, className = '', ...props }) => {
  const classes = `px-5 py-4 border-b border-gray-200 ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card.Body component for the main content of a card
 */
const CardBody = ({ children, className = '', ...props }) => {
  const classes = `p-5 ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card.Footer component for the footer section of a card
 */
const CardFooter = ({ children, className = '', ...props }) => {
  const classes = `px-5 py-4 border-t border-gray-200 ${className}`.trim();
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card.Image component for images in a card
 */
const CardImage = ({ src, alt = '', className = '', ...props }) => {
  const classes = `w-full object-cover ${className}`.trim();
  
  return (
    <img src={src} alt={alt} className={classes} {...props} />
  );
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card; 