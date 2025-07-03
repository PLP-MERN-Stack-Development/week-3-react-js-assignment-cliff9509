// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// No need to import useTheme here if we are relying on body styles
// import { useTheme } from '../contexts/ThemeContext';

/**
 * Layout component that includes Navbar and Footer, wrapping the main content.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The main content to be displayed within the layout.
 */
const Layout = ({ children }) => {
  // The body's CSS variables (set in index.css and controlled by ThemeProvider)
  // will handle the background and text color for the overall page.
  // We remove direct Tailwind bg- and text- classes here to avoid conflicts.
  return (
    <div className="flex flex-col min-h-screen font-inter">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
