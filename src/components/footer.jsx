import React from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

/**
 * Reusable Footer component with copyright information.
 * @param {object} props - Component props.
 * @param {string} [props.companyName='My React App'] - The name of the company for copyright.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes.
 */
const Footer = ({ companyName = 'My React App', className = '' }) => {
  const { theme } = useTheme(); // Get current theme
  const footerBgClass = theme === 'light' ? 'bg-gray-800' : 'bg-gray-900';
  const textColorClass = theme === 'light' ? 'text-white' : 'text-gray-300';

  return (
    <footer className={`${footerBgClass} ${textColorClass} p-4 text-center rounded-t-lg ${className}`}>
      <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
