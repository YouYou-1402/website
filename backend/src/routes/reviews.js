const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleLike
} = require('../controllers/reviewController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, getReviews);

// Protected routes
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
