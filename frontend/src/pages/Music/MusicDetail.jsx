import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import ReviewForm from '../../components/Reviews/ReviewForm';
import ReviewsList from '../../components/Reviews/ReviewsList';
import { 
  StarIcon,
  CalendarIcon,
  MusicalNoteIcon,
  UserIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const MusicDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: albumData, loading, error, refetch } = useApi(
    API_ENDPOINTS.MUSIC.DETAIL(id)
  );

  const { mutate } = useApiMutation();

  if (loading) {
    return <LoadingSpinner text="Loading album details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const album = albumData?.data;
  const reviews = album?.reviews || [];

  if (!album) {
    return <ErrorMessage message="Album not found" />;
  }

  const handleReviewSubmit = async (reviewData) => {
    const result = await mutate('post', API_ENDPOINTS.REVIEWS.CREATE, {
      ...reviewData,
      itemType: 'music',
      itemId: id
    });

    if (result.success) {
      setShowReviewModal(false);
      refetch();
    }

    return result;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      const halfFilled = index === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <div key={index} className="relative">
          {filled ? (
            <StarSolidIcon className="w-5 h-5 text-vintage-gold" />
          ) : halfFilled ? (
            <>
              <StarIcon className="w-5 h-5 text-vintage-lightbrown absolute" />
              <StarSolidIcon 
                className="w-5 h-5 text-vintage-gold" 
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            </>
          ) : (
            <StarIcon className="w-5 h-5 text-vintage-lightbrown" />
          )}
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-vintage-sepia">
          <li><Link to="/" className="vintage-link">Home</Link></li>
          <li>/</li>
          <li><Link to="/music" className="vintage-link">Music</Link></li>
          <li>/</li>
          <li className="text-vintage-brown">{album.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Album Cover & Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            {/* Cover Image */}
            <div className="aspect-square mb-6 overflow-hidden rounded-lg">
              <img
                src={album.coverImage || '/placeholder-album.jpg'}
                alt={album.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              {/* Rating */}
              {album.averageRating > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(album.averageRating)}
                  </div>
                  <span className="font-medium text-vintage-brown">
                    {album.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-vintage-sepia">
                    ({album.totalReviews} reviews)
                  </span>
                </div>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {album.genre?.map((genre) => (
                  <Badge key={genre} variant="primary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Released: {album.releaseYear}</span>
                </div>
                
                {album.label && (
                  <div className="flex items-center space-x-2 text-vintage-sepia">
                    <MusicalNoteIcon className="w-4 h-4" />
                    <span>Label: {album.label}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <UserIcon className="w-4 h-4" />
                  <span>Added by: {album.createdBy?.fullName || album.createdBy?.username}</span>
                </div>
              </div>

              {/* Actions */}
              {isAuthenticated && (
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full"
                  >
                    <ChatBubbleLeftIcon className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Album Header */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-vintage-brown mb-2">
              {album.title}
            </h1>
            <p className="text-xl text-vintage-sepia mb-4">
              by <span className="font-medium">{album.artist}</span>
            </p>
            
            {/* Tags */}
            {album.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {album.tags.map((tag) => (
                  <Badge key={tag} size="sm" variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <Card>
            <h2 className="text-2xl font-serif font-semibold text-vintage-brown mb-4">
              About This Album
            </h2>
            <div className="prose prose-vintage max-w-none">
              <p className="text-vintage-sepia leading-relaxed whitespace-pre-line">
                {album.description}
              </p>
            </div>
          </Card>

          {/* Track List */}
          {album.tracks?.length > 0 && (
            <Card>
              <h2 className="text-2xl font-serif font-semibold text-vintage-brown mb-4">
                Track List
              </h2>
              <div className="space-y-2">
                {album.tracks.map((track, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-vintage-cream/30 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-vintage-sepia w-6">
                        {index + 1}.
                      </span>
                      <span className="text-vintage-brown">
                        {typeof track === 'string' ? track : track.title}
                      </span>
                    </div>
                    {typeof track === 'object' && track.duration && (
                      <span className="text-sm text-vintage-sepia">
                        {track.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Reviews Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-vintage-brown">
                Reviews ({album.totalReviews || 0})
              </h2>
              
              {isAuthenticated && (
                <Button
                  variant="outline"
                  onClick={() => setShowReviewModal(true)}
                >
                  Write Review
                </Button>
              )}
            </div>

            <ReviewsList 
              reviews={reviews}
              itemType="music"
              itemId={id}
              onUpdate={refetch}
            />
          </Card>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Review"
        size="lg"
      >
        <ReviewForm
          itemType="music"
          itemTitle={album.title}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewModal(false)}
        />
      </Modal>
    </div>
  );
};

export default MusicDetail;
