const Music = require('../models/Music');
const Review = require('../models/Review');

// @desc    Get all music
// @route   GET /api/music
// @access  Public
const getMusic = async (req, res) => {
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

    // Filter by artist
    if (req.query.artist) {
      query.artist = new RegExp(req.query.artist, 'i');
    }

    // Filter by year
    if (req.query.year) {
      query.releaseYear = req.query.year;
    }

    // Sort
    let sort = req.query.sort || '-createdAt';

    const music = await Music.find(query)
      .populate('createdBy', 'username fullName avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Music.countDocuments(query);

    res.json({
      success: true,
      data: music,
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

// @desc    Get single music item
// @route   GET /api/music/:id
// @access  Public
const getMusicItem = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id)
      .populate('createdBy', 'username fullName avatar');

    if (!music) {
      return res.status(404).json({ 
        success: false, 
        message: 'Music not found' 
      });
    }

    // Get reviews
    const reviews = await Review.find({ 
      itemType: 'music', 
      itemId: req.params.id,
      isApproved: true 
    })
      .populate('author', 'username fullName avatar')
      .sort('-createdAt');

    res.json({
      success: true,
      data: {
        ...music.toObject(),
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

// @desc    Create music
// @route   POST /api/music
// @access  Private
const createMusic = async (req, res) => {
  try {
    const musicData = {
      ...req.body,
      createdBy: req.user.id
    };

    const music = await Music.create(musicData);

    const populatedMusic = await Music.findById(music._id)
      .populate('createdBy', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedMusic
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during music creation' 
    });
  }
};

// @desc    Update music
// @route   PUT /api/music/:id
// @access  Private
const updateMusic = async (req, res) => {
  try {
    let music = await Music.findById(req.params.id);

    if (!music) {
      return res.status(404).json({ 
        success: false, 
        message: 'Music not found' 
      });
    }

    // Check ownership or admin
    if (music.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this music' 
      });
    }

    music = await Music.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username fullName avatar');

    res.json({
      success: true,
      data: music
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during music update' 
    });
  }
};

// @desc    Delete music
// @route   DELETE /api/music/:id
// @access  Private
const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);

    if (!music) {
      return res.status(404).json({ 
        success: false, 
        message: 'Music not found' 
      });
    }

    // Check ownership or admin
    if (music.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this music' 
      });
    }

    await Music.findByIdAndDelete(req.params.id);

    // Delete related reviews
    await Review.deleteMany({ itemType: 'music', itemId: req.params.id });

    res.json({
      success: true,
      message: 'Music deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during music deletion' 
    });
  }
};

// @desc    Get music genres
// @route   GET /api/music/genres
// @access  Public
const getGenres = async (req, res) => {
  try {
    const genres = await Music.distinct('genre');
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
  getMusic,
  getMusicItem,
  createMusic,
  updateMusic,
  deleteMusic,
  getGenres
};
