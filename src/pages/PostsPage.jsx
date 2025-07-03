import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10; // Number of posts per page

  const { theme } = useTheme();

  // Determine input and text colors based on theme
  const inputClasses = theme === 'light'
    ? 'bg-white border-gray-300 text-gray-900'
    : 'bg-gray-600 border-gray-500 text-gray-100';
  const postItemClasses = theme === 'light'
    ? 'bg-gray-50 text-gray-800'
    : 'bg-gray-700 text-gray-200';
  const paginationButtonClasses = (disabled) =>
    `px-4 py-2 rounded-lg font-semibold transition duration-200 ${
      disabled
        ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
        : (theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-400 text-gray-900 hover:bg-blue-500')
    }`;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // JSONPlaceholder supports _page and _limit for pagination, and q for full-text search
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}&q=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // For total pages, JSONPlaceholder sends X-Total-Count in headers
        const totalCount = response.headers.get('X-Total-Count');
        setTotalPages(Math.ceil(totalCount / postsPerPage));
        setPosts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm]); // Re-fetch when page or search term changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <Card title="Public Posts" className="w-full max-w-2xl" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--card-text)' }}>
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search posts..."
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${inputClasses}`}
          />
        </div>

        {loading && (
          <p className="text-center text-blue-600 dark:text-blue-300 text-lg">Loading posts...</p>
        )}

        {error && (
          <p className="text-center text-red-600 dark:text-red-400 text-lg">Error: {error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className={`p-4 rounded-lg shadow-sm ${postItemClasses}`}>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={paginationButtonClasses(currentPage === 1)}
            >
              Previous
            </Button>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={paginationButtonClasses(currentPage === totalPages)}
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PostsPage;