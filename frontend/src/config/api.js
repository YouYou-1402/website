const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : `http://${window.location.hostname}:5000/api`);

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password'
  },
  
  // Books
  BOOKS: {
    LIST: '/books',
    DETAIL: (id) => `/books/${id}`,
    CREATE: '/books',
    UPDATE: (id) => `/books/${id}`,
    DELETE: (id) => `/books/${id}`,
    GENRES: '/books/genres'
  },
  
  // Movies
  MOVIES: {
    LIST: '/movies',
    DETAIL: (id) => `/movies/${id}`,
    CREATE: '/movies',
    UPDATE: (id) => `/movies/${id}`,
    DELETE: (id) => `/movies/${id}`,
    GENRES: '/movies/genres'
  },
  
  // Music
  MUSIC: {
    LIST: '/music',
    DETAIL: (id) => `/music/${id}`,
    CREATE: '/music',
    UPDATE: (id) => `/music/${id}`,
    DELETE: (id) => `/music/${id}`,
    GENRES: '/music/genres'
  },
  
  // Blog
  BLOG: {
    LIST: '/blog',
    DETAIL: (id) => `/blog/${id}`,
    CREATE: '/blog',
    UPDATE: (id) => `/blog/${id}`,
    DELETE: (id) => `/blog/${id}`,
    LIKE: (id) => `/blog/${id}/like`
  },
  
  // Comments
  COMMENTS: {
    LIST: (postId) => `/comments/post/${postId}`,
    CREATE: '/comments',
    UPDATE: (id) => `/comments/${id}`,
    DELETE: (id) => `/comments/${id}`,
    LIKE: (id) => `/comments/${id}/like`
  },
  
  // Reviews
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews',
    UPDATE: (id) => `/reviews/${id}`,
    DELETE: (id) => `/reviews/${id}`,
    LIKE: (id) => `/reviews/${id}/like`
  },

  //profile
  
};

export { API_BASE_URL };
