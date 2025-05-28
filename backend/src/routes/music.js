const express = require('express');
const router = express.Router();
const {
  getMusic,
  getMusicItem,
  createMusic,
  updateMusic,
  deleteMusic,
  getGenres
} = require('../controllers/musicController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, getMusic);
router.get('/genres', getGenres);
router.get('/:id', optionalAuth, getMusicItem);

// Protected routes
router.post('/', protect, createMusic);
router.put('/:id', protect, updateMusic);
router.delete('/:id', protect, deleteMusic);

module.exports = router;
