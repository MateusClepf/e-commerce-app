import React from 'react';
import PropTypes from 'prop-types';

/**
 * Heading component for displaying headings with consistent styling
 */
export const Heading = ({
  level = 1,
  children,
  className = '',
  weight = null,
  color = null,
  ...props
}) => {
  // Font sizes based on heading level
  const sizesMap = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };
  
  // Font weights
  const weightsMap = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  // Default weights based on level
  const defaultWeightsMap = {
    1: 'font-bold',
    2: 'font-bold',
    3: 'font-semibold',
    4: 'font-semibold',
    5: 'font-medium',
    6: 'font-medium',
  };
  
  // Colors
  const colorsMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    dark: 'text-dark',
    light: 'text-light',
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-500',
  };
  
  // Computed classes
  const sizeClass = sizesMap[level] || 'text-base';
  const weightClass = weight ? weightsMap[weight] : defaultWeightsMap[level];
  const colorClass = color ? colorsMap[color] : '';
  
  const combinedClassName = `${sizeClass} ${weightClass} ${colorClass} ${className}`.trim();
  const Component = `h${level}`;
  
  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'semibold', 'bold']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'dark', 'light', 'white', 'black', 'gray']),
};

/**
 * Text component for displaying paragraphs and other text with consistent styling
 */
export const Text = ({
  children,
  size = 'base',
  weight = 'normal',
  color = null,
  align = null,
  className = '',
  as = 'p',
  ...props
}) => {
  // Font sizes
  const sizesMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };
  
  // Font weights
  const weightsMap = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  // Colors
  const colorsMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    dark: 'text-dark',
    light: 'text-light',
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-500',
    'gray-dark': 'text-gray-700',
    'gray-light': 'text-gray-300',
    muted: 'text-gray-400',
  };
  
  // Text alignment
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  // Computed classes
  const sizeClass = sizesMap[size] || 'text-base';
  const weightClass = weightsMap[weight] || 'font-normal';
  const colorClass = color ? colorsMap[color] : '';
  const alignClass = align ? alignMap[align] : '';
  
  const combinedClassName = `${sizeClass} ${weightClass} ${colorClass} ${alignClass} ${className}`.trim();
  const Component = as;
  
  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl', '2xl']),
  weight: PropTypes.oneOf(['light', 'normal', 'medium', 'semibold', 'bold']),
  color: PropTypes.oneOf([
    'primary', 'secondary', 'accent', 'dark', 'light', 
    'white', 'black', 'gray', 'gray-dark', 'gray-light', 'muted'
  ]),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  className: PropTypes.string,
  as: PropTypes.string,
};

export default { Heading, Text }; 