const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by tag
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }

    // Filter by author
    if (req.query.author) {
      const authorQuery = await User.findOne({ username: req.query.author });
      if (authorQuery) {
        query.author = authorQuery._id;
      }
    }

    // Sort
    let sort = req.query.sort || '-publishedAt';

    const posts = await BlogPost.find(query)
      .populate('author', 'username fullName avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: posts,
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

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username fullName avatar');

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    // Get comments
    const comments = await Comment.find({ 
      post: req.params.id, 
      isApproved: true,
      parentComment: null // Only top-level comments
    })
      .populate('author', 'username fullName avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'username fullName avatar'
        }
      })
      .sort('-createdAt');

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        comments
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

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id
    };

    const post = await BlogPost.create(postData);

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during post creation' 
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
const updateBlogPost = async (req, res) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    // Check ownership or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this post' 
      });
    }

    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username fullName avatar');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during post update' 
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    // Check ownership or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this post' 
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    // Delete related comments
    await Comment.deleteMany({ post: req.params.id });

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during post deletion' 
    });
  }
};

// @desc    Like/Unlike blog post
// @route   POST /api/blog/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    const likeIndex = post.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user.id);
    }

    await post.save();

    res.json({
      success: true,
      data: {
        likes: post.likes.length,
        isLiked: post.likes.includes(req.user.id)
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

module.exports = {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleLike
};
