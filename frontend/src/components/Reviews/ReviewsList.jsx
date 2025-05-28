import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApiMutation } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ReviewForm from './ReviewForm';
import { 
  StarIcon,
  HandThumbUpIcon,
  PencilIcon,
  TrashIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarSolidIcon,
  HandThumbUpIcon as HandThumbUpSolidIcon 
} from '@heroicons/react/24/solid';

const ReviewsList = ({ reviews, itemType, itemId, onUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const { mutate } = useApiMutation();
  const [editingReview, setEditingReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLikeReview = async (reviewId) => {
    if (!isAuthenticated) return;

    const result = await mutate('post', API_ENDPOINTS.REVIEWS.LIKE(reviewId));
    if (result.success) {
      onUpdate();
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowEditModal(true);
  };

  const handleUpdateReview = async (reviewData) => {
    const result = await mutate('put', API_ENDPOINTS.REVIEWS.UPDATE(editingReview._id), reviewData);
    
    if (result.success) {
      setShowEditModal(false);
      setEditingReview(null);
      onUpdate();
    }

    return result;
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    const result = await mutate('delete', API_ENDPOINTS.REVIEWS.DELETE(reviewId));
    if (result.success) {
      onUpdate();
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      
      return filled ? (
        <StarSolidIcon key={index} className="w-4 h-4 text-vintage-gold" />
      ) : (
        <StarIcon key={index} className="w-4 h-4 text-vintage-lightbrown" />
      );
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-vintage-sepia">
          No reviews yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUser={user}
            isAuthenticated={isAuthenticated}
            onLike={() => handleLikeReview(review._id)}
            onEdit={() => handleEditReview(review)}
            onDelete={() => handleDeleteReview(review._id)}
            renderStars={renderStars}
          />
        ))}
      </div>

      {/* Edit Review Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingReview(null);
        }}
        title="Edit Review"
        size="lg"
      >
        {editingReview && (
          <ReviewForm
            itemType={itemType}
            itemTitle={editingReview.itemId?.title || 'Item'}
            onSubmit={handleUpdateReview}
            onCancel={() => {
              setShowEditModal(false);
              setEditingReview(null);
            }}
            initialData={{
              rating: editingReview.rating,
              title: editingReview.title,
              content: editingReview.content
            }}
          />
        )}
      </Modal>
    </>
  );
};

// Review Card Component
const ReviewCard = ({ 
  review, 
  currentUser, 
  isAuthenticated,
  onLike, 
  onEdit, 
  onDelete, 
  renderStars 
}) => {
  const isOwner = currentUser && review.userId?._id === currentUser._id;
  const isLiked = review.likes?.includes(currentUser?._id);

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-vintage-brown rounded-full flex items-center justify-center">
            {review.userId?.avatar ? (
              <img 
                src={review.userId.avatar} 
                alt={review.userId.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-5 h-5 text-vintage-cream" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-vintage-brown">
              {review.userId?.fullName || review.userId?.username || 'Anonymous'}
            </h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-vintage-sepia">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {isOwner && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="p-2"
            >
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-vintage-brown">
          {review.title}
        </h3>
        <p className="text-vintage-sepia leading-relaxed whitespace-pre-line">
          {review.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-vintage-lightbrown/30">
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          {isAuthenticated && (
            <button
              onClick={onLike}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                isLiked 
                  ? 'text-vintage-gold' 
                  : 'text-vintage-sepia hover:text-vintage-brown'
              }`}
            >
              {isLiked ? (
                <HandThumbUpSolidIcon className="w-4 h-4" />
              ) : (
                <HandThumbUpIcon className="w-4 h-4" />
              )}
              <span>{review.likes?.length || 0}</span>
            </button>
          )}
          
          {!isAuthenticated && review.likes?.length > 0 && (
            <div className="flex items-center space-x-1 text-sm text-vintage-sepia">
              <HandThumbUpIcon className="w-4 h-4" />
              <span>{review.likes.length}</span>
            </div>
          )}
        </div>

        {/* Updated indicator */}
        {review.updatedAt !== review.createdAt && (
          <span className="text-xs text-vintage-sepia">
            Updated {new Date(review.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  );
};

export default ReviewsList;
