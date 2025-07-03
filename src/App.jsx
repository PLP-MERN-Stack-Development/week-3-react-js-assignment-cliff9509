import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/aboutpage';
import PostsPage from './pages/PostsPage'; // Import PostsPage
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/posts" element={<PostsPage />} /> {/* New route for PostsPage */}
            {/* Add more routes here */}
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;


