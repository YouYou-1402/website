const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateUser, validateLogin } = require('../middleware/validation');

// Public routes
router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
