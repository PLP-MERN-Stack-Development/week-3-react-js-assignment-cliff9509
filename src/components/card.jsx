import React from 'react';

/**
 * Reusable Card component for displaying content in a boxed layout.
 * @param {object} props - Component props.
 * @param {string} [props.title] - The title of the card.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the card container.
 */
const Card = ({ title, children, className = '' }) => {
  return (
    // Use Tailwind's dark: variant for background and text colors
    <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-xl p-8 m-4 w-full max-w-md ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;