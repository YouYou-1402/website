import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth Routes (without layout) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main Routes (with layout) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route index element={<Home />} />
                  
                  {/* Books */}
                  <Route path="books" element={<BooksList />} />
                  <Route path="books/:id" element={<BookDetail />} />
                  
                  {/* Movies */}
                  <Route path="movies" element={<MoviesList />} />
                  <Route path="movies/:id" element={<MovieDetail />} />
                  
                  {/* Music */}
                  <Route path="music" element={<MusicList />} />
                  <Route path="music/:id" element={<MusicDetail />} />
                  
                  {/* Blog */}
                  <Route path="blog" element={<BlogList />} />
                  <Route path="blog/:id" element={<BlogDetail />} />
                  
                  {/* Protected Routes */}
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
