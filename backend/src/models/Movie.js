const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  cast: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  genre: [{
    type: String,
    required: true
  }],
  releaseYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear() + 5
  },
  duration: {
    type: Number, // in minutes
    min: 1
  },
  poster: {
    type: String,
    default: 'https://via.placeholder.com/300x450'
  },
  trailer: {
    type: String // YouTube URL
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

movieSchema.index({ title: 'text', director: 'text', description: 'text' });

module.exports = mongoose.model('Movie', movieSchema);
