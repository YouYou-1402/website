const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('fullName')
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters')
    .trim(),
  
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Book validation
const validateBook = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters')
    .trim(),
  
  body('author')
    .isLength({ min: 1, max: 100 })
    .withMessage('Author is required and must be less than 100 characters')
    .trim(),
  
  body('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  
  body('genre')
    .isArray({ min: 1 })
    .withMessage('At least one genre is required'),
  
  body('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Published year must be a valid year'),
  
  handleValidationErrors
];

// Blog post validation
const validateBlogPost = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters')
    .trim(),
  
  body('content')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),
  
  body('category')
    .isIn(['books', 'movies', 'music', 'general', 'review'])
    .withMessage('Invalid category'),
  
  handleValidationErrors
];

module.exports = {
  validateUser,
  validateLogin,
  validateBook,
  validateBlogPost,
  handleValidationErrors
};
