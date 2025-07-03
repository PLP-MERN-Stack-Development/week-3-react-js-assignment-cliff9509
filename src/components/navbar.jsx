// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

/**
 * Reusable Navbar component for site navigation.
 * @param {object} props - Component props.
 * @param {Array<{path: string, name: string}>} [props.links] - Array of navigation links.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes.
 */
const Navbar = ({ links = [], className = '' }) => {
  const { theme } = useTheme(); // Get current theme

  const defaultLinks = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  const navBgClass = theme === 'light' ? 'bg-white' : 'bg-gray-700';
  const linkTextColorClass = theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-blue-300 hover:text-blue-500';

  return (
    <nav className={`${navBgClass} shadow-md p-4 rounded-b-lg ${className}`}>
      <ul className="flex justify-center space-x-6">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={`${linkTextColorClass} text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;