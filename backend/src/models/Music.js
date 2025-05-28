const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Music title is required'],
    trim: true
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
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
    max: new Date().getFullYear()
  },
  duration: {
    type: String // Format: "3:45"
  },
  coverArt: {
    type: String,
    default: 'https://via.placeholder.com/300x300'
  },
  spotifyUrl: {
    type: String
  },
  youtubeUrl: {
    type: String
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

musicSchema.index({ title: 'text', artist: 'text', description: 'text' });

module.exports = mongoose.model('Music', musicSchema);
