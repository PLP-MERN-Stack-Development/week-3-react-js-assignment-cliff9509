import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import TaskManager from '../components/TaskManager'; // Import TaskManager
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

const HomePage = () => {
  const { toggleTheme } = useTheme(); // Use theme context

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <Card title="Welcome to Our App!" className="mb-8"> {/* Removed inline style */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
          This is a simple React application demonstrating reusable components, routing, and state management.
        </p>
        <div className="flex space-x-4 justify-center mb-4">
          <Button variant="primary" onClick={() => alert('Primary button clicked!')}>
            Get Started
          </Button>
          <Button variant="secondary" onClick={() => alert('Secondary button clicked!')}>
            Learn More
          </Button>
        </div>
        <div className="flex justify-center">
          <Button onClick={toggleTheme} variant="secondary">
            Toggle Theme
          </Button>
        </div>
      </Card>

      <TaskManager /> {/* Integrate the TaskManager component */}
    </div>
  );
};

export default HomePage;