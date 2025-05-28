const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getGenres
} = require('../controllers/movieController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, getMovies);
router.get('/genres', getGenres);
router.get('/:id', optionalAuth, getMovie);

// Protected routes
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
