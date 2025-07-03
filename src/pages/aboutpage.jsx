import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

const AboutPage = () => {
  const { toggleTheme } = useTheme(); // Use theme context

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <Card title="About This Project"> {/* Removed inline style */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          This project showcases a basic React setup with Vite, Tailwind CSS, and React Router.
          It also demonstrates the creation of reusable UI components, state management using hooks,
          and context API for theme management.
        </p>
        <div className="flex space-x-4 justify-center mb-4">
          <Button variant="danger" onClick={() => alert('Danger button clicked!')}>
            Report Issue
          </Button>
        </div>
        <div className="flex justify-center">
          <Button onClick={toggleTheme} variant="secondary">
            Toggle Theme
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AboutPage;

