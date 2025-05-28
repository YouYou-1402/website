const Review = require('../models/Review');
const Book = require('../models/Book');
const Movie = require('../models/Movie');
const Music = require('../models/Music');

// @desc    Get reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isApproved: true };

    // Filter by item type
    if (req.query.itemType) {
      query.itemType = req.query.itemType;
    }

    // Filter by item ID
    if (req.query.itemId) {
      query.itemId = req.query.itemId;
    }

    // Filter by author
    if (req.query.author) {
      query.author = req.query.author;
    }

    // Filter by rating
    if (req.query.rating) {
      query.rating = req.query.rating;
    }

    const reviews = await Review.find(query)
      .populate('author', 'username fullName avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: reviews,
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

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { content, rating, itemType, itemId } = req.body;

    // Check if item exists
    let item;
    switch (itemType) {
      case 'book':
        item = await Book.findById(itemId);
        break;
      case 'movie':
        item = await Movie.findById(itemId);
        break;
      case 'music':
        item = await Music.findById(itemId);
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid item type' 
        });
    }

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found' 
      });
    }

    // Check if user already reviewed this item
    const existingReview = await Review.findOne({
      author: req.user.id,
      itemId,
      itemType
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this item' 
      });
    }

    const reviewData = {
      content,
      rating,
      itemType,
      itemId,
      author: req.user.id
    };

    const review = await Review.create(reviewData);

    // Update item's rating and review count
    await updateItemRating(itemType, itemId);

    const populatedReview = await Review.findById(review._id)
      .populate('author', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during review creation' 
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    // Check ownership
    if (review.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this review' 
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username fullName avatar');

    // Update item's rating
    await updateItemRating(review.itemType, review.itemId);

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during review update' 
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    // Check ownership or admin
    if (review.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this review' 
      });
    }

    const { itemType, itemId } = review;

    await Review.findByIdAndDelete(req.params.id);

    // Update item's rating
    await updateItemRating(itemType, itemId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during review deletion' 
    });
  }
};

// @desc    Like/Unlike review
// @route   POST /api/reviews/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    const likeIndex = review.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      review.likes.splice(likeIndex, 1);
    } else {
      review.likes.push(req.user.id);
    }

    await review.save();

    res.json({
      success: true,
      data: {
        likes: review.likes.length,
        isLiked: review.likes.includes(req.user.id)
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

// Helper function to update item rating
const updateItemRating = async (itemType, itemId) => {
  try {
    const reviews = await Review.find({ 
      itemType, 
      itemId, 
      isApproved: true 
    });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    let Model;
    switch (itemType) {
      case 'book':
        Model = Book;
        break;
      case 'movie':
        Model = Movie;
        break;
      case 'music':
        Model = Music;
        break;
    }

    if (Model) {
      await Model.findByIdAndUpdate(itemId, {
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews
      });
    }
  } catch (error) {
    console.error('Error updating item rating:', error);
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleLike
};
