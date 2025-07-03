// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage.
 * @param {string} key - The key to store the value in localStorage.
 * @param {*} initialValue - The initial value if nothing is found in localStorage.
 * @returns {[*, function]} - A stateful value and a function to update it.
 */
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // useEffect to update localStorage when the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]); // Only re-run if key or storedValue changes

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
