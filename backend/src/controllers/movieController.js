const Movie = require('../models/Movie');
const Review = require('../models/Review');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Filter by genre
    if (req.query.genre) {
      query.genre = { $in: [req.query.genre] };
    }

    // Filter by director
    if (req.query.director) {
      query.director = new RegExp(req.query.director, 'i');
    }

    // Filter by year
    if (req.query.year) {
      query.releaseYear = req.query.year;
    }

    // Sort
    let sort = req.query.sort || '-createdAt';

    const movies = await Movie.find(query)
      .populate('createdBy', 'username fullName avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments(query);

    res.json({
      success: true,
      data: movies,
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

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('createdBy', 'username fullName avatar');

    if (!movie) {
      return res.status(404).json({ 
        success: false, 
        message: 'Movie not found' 
      });
    }

    // Get reviews
    const reviews = await Review.find({ 
      itemType: 'movie', 
      itemId: req.params.id,
      isApproved: true 
    })
      .populate('author', 'username fullName avatar')
      .sort('-createdAt');

    res.json({
      success: true,
      data: {
        ...movie.toObject(),
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

// @desc    Create movie
// @route   POST /api/movies
// @access  Private
const createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      createdBy: req.user.id
    };

    const movie = await Movie.create(movieData);

    const populatedMovie = await Movie.findById(movie._id)
      .populate('createdBy', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedMovie
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during movie creation' 
    });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
const updateMovie = async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ 
        success: false, 
        message: 'Movie not found' 
      });
    }

    // Check ownership or admin
    if (movie.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this movie' 
      });
    }

    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName avatar');

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during movie update' 
    });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ 
        success: false, 
        message: 'Movie not found' 
      });
    }

    // Check ownership or admin
    if (movie.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this movie' 
      });
    }

    await Movie.findByIdAndDelete(req.params.id);

    // Delete related reviews
    await Review.deleteMany({ itemType: 'movie', itemId: req.params.id });

    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during movie deletion' 
    });
  }
};

// @desc    Get movie genres
// @route   GET /api/movies/genres
// @access  Public
const getGenres = async (req, res) => {
  try {
    const genres = await Movie.distinct('genre');
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
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  getGenres
};
