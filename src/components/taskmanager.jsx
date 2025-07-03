import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/uselocalstorage';
import Card from './Card';
import Button from './Button';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme hook

/**
 * TaskManager component for adding, completing, deleting, and filtering tasks.
 */
const TaskManager = () => {
  // Use custom hook for persisting tasks
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const { theme } = useTheme(); // Get current theme

  // Determine input and text colors based on theme
  const inputClasses = theme === 'light'
    ? 'bg-white border-gray-300 text-gray-900'
    : 'bg-gray-600 border-gray-500 text-gray-100';
  const taskItemClasses = theme === 'light'
    ? 'bg-gray-50 text-gray-800'
    : 'bg-gray-700 text-gray-200';
  const completedTaskClasses = theme === 'light'
    ? 'line-through text-gray-500'
    : 'line-through text-gray-400';
  const filterButtonClasses = (currentFilter) =>
    `px-4 py-2 rounded-lg font-semibold transition duration-200 ${
      filter === currentFilter
        ? (theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-gray-900')
        : (theme === 'light' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-600 text-gray-300 hover:bg-gray-500')
    }`;

  // Add a new task
  const addTask = (e) => {
    e.preventDefault(); // Prevent page reload
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask(''); // Clear input
    }
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true; // 'all'
  });

  return (
    <Card title="Task Manager" className="w-full max-w-xl" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex mb-6 space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${inputClasses}`}
        />
        <Button type="submit" variant="primary">
          Add Task
        </Button>
      </form>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={filterButtonClasses('all')}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filterButtonClasses('active')}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filterButtonClasses('completed')}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks to display.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-200 ${taskItemClasses}`}
            >
              <span
                className={`flex-grow cursor-pointer text-lg ${
                  task.completed ? completedTaskClasses : ''
                }`}
                onClick={() => toggleComplete(task.id)}
              >
                {task.text}
              </span>
              <Button variant="danger" onClick={() => deleteTask(task.id)} className="ml-4 px-3 py-1 text-sm">
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default TaskManager;
