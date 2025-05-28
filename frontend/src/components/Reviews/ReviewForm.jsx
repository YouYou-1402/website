import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';

const ReviewForm = ({ itemType, itemTitle, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rating) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Review title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Review content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Review content must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await onSubmit(formData);
      
      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const filled = starValue <= formData.rating;
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starValue)}
          className="focus:outline-none hover:scale-110 transition-transform"
        >
          {filled ? (
            <StarSolidIcon className="w-8 h-8 text-vintage-gold" />
          ) : (
            <StarIcon className="w-8 h-8 text-vintage-lightbrown hover:text-vintage-gold transition-colors" />
          )}
        </button>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* Item Info */}
      <div className="bg-vintage-cream/30 rounded-lg p-4">
        <p className="text-sm text-vintage-sepia mb-1">
          Writing a review for:
        </p>
        <h3 className="font-serif font-semibold text-vintage-brown">
          {itemTitle}
        </h3>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-vintage-brown mb-2">
          Rating *
        </label>
        <div className="flex items-center space-x-1">
          {renderStars()}
          {formData.rating > 0 && (
            <span className="ml-3 text-sm text-vintage-sepia">
              {formData.rating} out of 5 stars
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
        )}
      </div>

      {/* Review Title */}
      <Input
        label="Review Title *"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Summarize your review in a few words"
        maxLength={100}
      />

      {/* Review Content */}
      <Textarea
        label="Your Review *"
        name="content"
        value={formData.content}
        onChange={handleChange}
        error={errors.content}
        placeholder="Share your thoughts about this item..."
        rows={6}
      />

      {/* Character Count */}
      <div className="text-right">
        <span className="text-sm text-vintage-sepia">
          {formData.content.length} characters
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
