const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ 
      post: req.params.postId, 
      isApproved: true,
      parentComment: null 
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
      data: comments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Create comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const { content, post, parentComment } = req.body;

    // Check if post exists
    const blogPost = await BlogPost.findById(post);
    if (!blogPost) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog post not found' 
      });
    }

    const commentData = {
      content,
      post,
      author: req.user.id,
      parentComment: parentComment || null
    };

    const comment = await Comment.create(commentData);

    // If it's a reply, add to parent's replies array
    if (parentComment) {
      await Comment.findByIdAndUpdate(
        parentComment,
        { $push: { replies: comment._id } }
      );
    }

    // Update post's comment count
    await BlogPost.findByIdAndUpdate(
      post,
      { $inc: { totalComments: 1 } }
    );

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username fullName avatar');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during comment creation' 
    });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Comment not found' 
      });
    }

    // Check ownership
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this comment' 
      });
    }

    comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true, runValidators: true }
    ).populate('author', 'username fullName avatar');

    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during comment update' 
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Comment not found' 
      });
    }

    // Check ownership or admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this comment' 
      });
    }

    // Delete all replies first
    await Comment.deleteMany({ parentComment: req.params.id });

    // Remove from parent's replies if it's a reply
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(
        comment.parentComment,
        { $pull: { replies: req.params.id } }
      );
    }

    await Comment.findByIdAndDelete(req.params.id);

    // Update post's comment count
    const totalDeleted = await Comment.countDocuments({ parentComment: req.params.id }) + 1;
    await BlogPost.findByIdAndUpdate(
      comment.post,
      { $inc: { totalComments: -totalDeleted } }
    );

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during comment deletion' 
    });
  }
};

// @desc    Like/Unlike comment
// @route   POST /api/comments/:id/like
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Comment not found' 
      });
    }

    const likeIndex = comment.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    } else {
      comment.likes.push(req.user.id);
    }

    await comment.save();

    res.json({
      success: true,
      data: {
        likes: comment.likes.length,
        isLiked: comment.likes.includes(req.user.id)
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
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike
};
