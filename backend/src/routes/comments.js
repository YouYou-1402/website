const express = require('express');
const router = express.Router();
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// All comment routes require authentication
router.get('/post/:postId', getComments);
router.post('/', protect, createComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);
router.post('/:id/like', protect, toggleLike);

module.exports = router;
