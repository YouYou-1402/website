const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleLike
} = require('../controllers/blogController');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateBlogPost } = require('../middleware/validation');

// Public routes
router.get('/', optionalAuth, getBlogPosts);
router.get('/:id', optionalAuth, getBlogPost);

// Protected routes
router.post('/', protect, validateBlogPost, createBlogPost);
router.put('/:id', protect, validateBlogPost, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
