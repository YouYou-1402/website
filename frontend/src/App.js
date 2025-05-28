import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import BooksList from './pages/Books/BooksList';
import BookDetail from './pages/Books/BookDetail';
import MoviesList from './pages/Movies/MoviesList';
import MovieDetail from './pages/Movies/MovieDetail';
import MusicList from './pages/Music/MusicList';
import MusicDetail from './pages/Music/MusicDetail';
import BlogList from './pages/Blog/BlogList';
import BlogDetail from './pages/Blog/BlogDetail';
import Profile from './pages/User/Profile';
import NotFound from './pages/NotFound';

// Styles
import './styles/index.css';

// Layout Wrapper Component
const LayoutWrapper = ({ children }) => (
  <Layout>{children}</Layout>
);

// Protected Layout Wrapper
const ProtectedLayoutWrapper = ({ children }) => (
  <Layout>
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth Routes - Không có Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Public Routes với Layout */}
            <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
            
            {/* Books */}
            <Route path="/books" element={<LayoutWrapper><BooksList /></LayoutWrapper>} />
            <Route path="/books/:id" element={<LayoutWrapper><BookDetail /></LayoutWrapper>} />
            
            {/* Movies */}
            <Route path="/movies" element={<LayoutWrapper><MoviesList /></LayoutWrapper>} />
            <Route path="/movies/:id" element={<LayoutWrapper><MovieDetail /></LayoutWrapper>} />
            
            {/* Music */}
            <Route path="/music" element={<LayoutWrapper><MusicList /></LayoutWrapper>} />
            <Route path="/music/:id" element={<LayoutWrapper><MusicDetail /></LayoutWrapper>} />
            
            {/* Blog */}
            <Route path="/blog" element={<LayoutWrapper><BlogList /></LayoutWrapper>} />
            <Route path="/blog/:id" element={<LayoutWrapper><BlogDetail /></LayoutWrapper>} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedLayoutWrapper><Profile /></ProtectedLayoutWrapper>} />
            
            {/* 404 */}
            <Route path="*" element={<LayoutWrapper><NotFound /></LayoutWrapper>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
