const Book = require('../models/Book');
const Review = require('../models/Review');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublished: true };

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Filter by genre
    if (req.query.genre) {
      query.genre = { $in: [req.query.genre] };
    }

    // Filter by author
    if (req.query.author) {
      query.author = new RegExp(req.query.author, 'i');
    }

    // Filter by year
    if (req.query.year) {
      query.publishedYear = req.query.year;
    }

    // Sort
    let sort = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      sort = sortBy;
    } else {
      sort = '-createdAt';
    }

    const books = await Book.find(query)
      .populate('createdBy', 'username fullName avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.json({
      success: true,
      data: books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('createdBy', 'username fullName avatar');

    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }

    // Get reviews for this book
    const reviews = await Review.find({ 
      itemType: 'book', 
      itemId: req.params.id,
      isApproved: true 
    })
      .populate('author', 'username fullName avatar')
      .sort('-createdAt');

    res.json({
      success: true,
      data: {
        ...book.toObject(),
        reviews
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Create book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      createdBy: req.user.id
    };

    const book = await Book.create(bookData);

    const populatedBook = await Book.findById(book._id)
      .populate('createdBy', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedBook
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during book creation' 
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }

    // Check ownership or admin
    if (book.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this book' 
      });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName avatar');

    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during book update' 
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }

    // Check ownership or admin
    if (book.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this book' 
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    // Also delete related reviews
    await Review.deleteMany({ itemType: 'book', itemId: req.params.id });

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during book deletion' 
    });
  }
};

// @desc    Get book genres
// @route   GET /api/books/genres
// @access  Public
const getGenres = async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json({
      success: true,
      data: genres.sort()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getGenres
};
