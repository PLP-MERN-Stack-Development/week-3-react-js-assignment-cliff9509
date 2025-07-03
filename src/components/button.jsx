// src/components/Button.jsx
import React from 'react';

/**
 * Reusable Button component with different variants.
 * @param {object} props - Component props.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The button's visual style.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {function} [props.onClick] - Click event handler.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.type='button'] - The button's type attribute.
 */
const Button = ({ variant = 'primary', className = '', children, onClick, disabled = false, type = 'button' }) => {
  let baseStyles = 'px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75';
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;