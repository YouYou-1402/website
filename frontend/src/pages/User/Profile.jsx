import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Badge from '../../components/UI/Badge';
import { 
  UserIcon,
  PencilIcon,
  BookOpenIcon,
  FilmIcon,
  MusicalNoteIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { data: userStats } = useApi(API_ENDPOINTS.USERS.STATS(user?._id));
  const { data: userReviews } = useApi(API_ENDPOINTS.USERS.REVIEWS(user?._id));
  const { mutate } = useApiMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const result = await mutate('put', API_ENDPOINTS.USERS.UPDATE_PROFILE, formData);
      
      if (result.success) {
        updateUser(result.data);
        setIsEditing(false);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const stats = userStats?.data || {};
  const reviews = userReviews?.data || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card className="text-center">
            {/* Avatar */}
            <div className="w-24 h-24 bg-vintage-brown rounded-full mx-auto mb-4 flex items-center justify-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-vintage-cream" />
              )}
            </div>

            {/* Basic Info */}
            <h1 className="text-2xl font-serif font-bold text-vintage-brown mb-2">
              {user?.fullName || user?.username}
            </h1>
            <p className="text-vintage-sepia mb-4">@{user?.username}</p>
            
            {user?.bio && (
              <p className="text-sm text-vintage-sepia mb-4 leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-vintage-sepia mb-6">
              {user?.location && (
                <p>📍 {user.location}</p>
              )}
              {user?.website && (
                <p>
                  🌐 <a href={user.website} target="_blank" rel="noopener noreferrer" className="vintage-link">
                    {user.website}
                  </a>
                </p>
              )}
              <p>📅 Joined {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="w-full"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <h3 className="font-serif font-semibold text-vintage-brown mb-4">
              Activity Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-vintage-brown">
                  {stats.totalReviews || 0}
                </div>
                <div className="text-sm text-vintage-sepia">Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vintage-brown">
                  {stats.totalLikes || 0}
                </div>
                <div className="text-sm text-vintage-sepia">Likes Received</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Form */}
          {isEditing && (
            <Card>
              <h2 className="text-xl font-serif font-semibold text-vintage-brown mb-4">
                Edit Profile
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                />

                <Textarea
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  error={errors.bio}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />

                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  placeholder="Where are you from?"
                />

                <Input
                  label="Website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  error={errors.website}
                  placeholder="https://your-website.com"
                />

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Recent Reviews */}
          <Card>
            <h2 className="text-xl font-serif font-semibold text-vintage-brown mb-4">
              Recent Reviews
            </h2>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <ReviewItem key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ChatBubbleLeftIcon className="w-12 h-12 text-vintage-lightbrown mx-auto mb-4" />
                <p className="text-vintage-sepia">
                  You haven't written any reviews yet.
                </p>
              </div>
            )}
          </Card>

          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <BookOpenIcon className="w-8 h-8 text-vintage-brown mx-auto mb-2" />
              <div className="text-lg font-semibold text-vintage-brown">
                {stats.booksReviewed || 0}
              </div>
              <div className="text-sm text-vintage-sepia">Books Reviewed</div>
            </Card>

            <Card className="text-center">
              <FilmIcon className="w-8 h-8 text-vintage-brown mx-auto mb-2" />
              <div className="text-lg font-semibold text-vintage-brown">
                {stats.moviesReviewed || 0}
              </div>
              <div className="text-sm text-vintage-sepia">Movies Reviewed</div>
            </Card>

            <Card className="text-center">
              <MusicalNoteIcon className="w-8 h-8 text-vintage-brown mx-auto mb-2" />
              <div className="text-lg font-semibold text-vintage-brown">
                {stats.musicReviewed || 0}
              </div>
              <div className="text-sm text-vintage-sepia">Albums Reviewed</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Item Component
const ReviewItem = ({ review }) => {
  const getItemIcon = (type) => {
    switch (type) {
      case 'book': return <BookOpenIcon className="w-4 h-4" />;
      case 'movie': return <FilmIcon className="w-4 h-4" />;
      case 'music': return <MusicalNoteIcon className="w-4 h-4" />;
      default: return <ChatBubbleLeftIcon className="w-4 h-4" />;
    }
  };

  const getItemPath = (type, id) => {
    switch (type) {
      case 'book': return `/books/${id}`;
      case 'movie': return `/movies/${id}`;
      case 'music': return `/music/${id}`;
      default: return '#';
    }
  };

  return (
    <div className="border-l-4 border-vintage-gold pl-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getItemIcon(review.itemType)}
          <Badge size="sm" variant="secondary">
            {review.itemType}
          </Badge>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < review.rating ? 'text-vintage-gold' : 'text-vintage-lightbrown'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-vintage-sepia">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <h4 className="font-medium text-vintage-brown mb-1">
        <a 
          href={getItemPath(review.itemType, review.itemId?._id)}
          className="vintage-link"
        >
          {review.itemId?.title || 'Unknown Item'}
        </a>
      </h4>
      
      <p className="text-sm text-vintage-sepia line-clamp-2">
        {review.content}
      </p>
    </div>
  );
};

export default Profile;
