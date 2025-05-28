const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres
} = require('../controllers/bookController');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateBook } = require('../middleware/validation');

// Public routes
router.get('/', optionalAuth, getBooks);
router.get('/genres', getGenres);
router.get('/:id', optionalAuth, getBook);

// Protected routes
router.post('/', protect, validateBook, createBook);
router.put('/:id', protect, validateBook, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
