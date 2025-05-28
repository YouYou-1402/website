const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
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
  publishedYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/300x400'
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

// Index for search
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);
