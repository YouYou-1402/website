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
  ClockIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  FilmIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const MovieDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: movieData, loading, error, refetch } = useApi(
    API_ENDPOINTS.MOVIES.DETAIL(id)
  );

  const { mutate } = useApiMutation();

  if (loading) {
    return <LoadingSpinner text="Loading movie details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const movie = movieData?.data;
  const reviews = movie?.reviews || [];

  if (!movie) {
    return <ErrorMessage message="Movie not found" />;
  }

  const handleReviewSubmit = async (reviewData) => {
    const result = await mutate('post', API_ENDPOINTS.REVIEWS.CREATE, {
      ...reviewData,
      itemType: 'movie',
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
          <li><Link to="/movies" className="vintage-link">Movies</Link></li>
          <li>/</li>
          <li className="text-vintage-brown">{movie.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster & Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            {/* Poster */}
            <div className="aspect-[2/3] mb-6 overflow-hidden rounded-lg">
              <img
                src={movie.poster || '/placeholder-movie.jpg'}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              {/* Rating */}
              {movie.averageRating > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(movie.averageRating)}
                  </div>
                  <span className="font-medium text-vintage-brown">
                    {movie.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-vintage-sepia">
                    ({movie.totalReviews} reviews)
                  </span>
                </div>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre?.map((genre) => (
                  <Badge key={genre} variant="primary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Released: {movie.releaseYear}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <ClockIcon className="w-4 h-4" />
                  <span>Duration: {movie.duration} minutes</span>
                </div>

                {movie.country && (
                  <div className="flex items-center space-x-2 text-vintage-sepia">
                    <FilmIcon className="w-4 h-4" />
                    <span>Country: {movie.country}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <UserIcon className="w-4 h-4" />
                  <span>Added by: {movie.createdBy?.fullName || movie.createdBy?.username}</span>
                </div>
              </div>

              {/* Cast */}
              {movie.cast?.length > 0 && (
                <div>
                  <h4 className="font-medium text-vintage-brown mb-2">Cast</h4>
                  <div className="flex flex-wrap gap-1">
                    {movie.cast.slice(0, 5).map((actor, index) => (
                      <Badge key={index} size="sm" variant="secondary">
                        {actor}
                      </Badge>
                    ))}
                    {movie.cast.length > 5 && (
                      <Badge size="sm" variant="secondary">
                        +{movie.cast.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

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
          {/* Movie Header */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-vintage-brown mb-2">
              {movie.title}
            </h1>
            <p className="text-xl text-vintage-sepia mb-4">
              Directed by <span className="font-medium">{movie.director}</span>
            </p>
            
            {/* Tags */}
            {movie.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.tags.map((tag) => (
                  <Badge key={tag} size="sm" variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Synopsis */}
          <Card>
            <h2 className="text-2xl font-serif font-semibold text-vintage-brown mb-4">
              Synopsis
            </h2>
            <div className="prose prose-vintage max-w-none">
              <p className="text-vintage-sepia leading-relaxed whitespace-pre-line">
                {movie.description}
              </p>
            </div>
          </Card>

          {/* Additional Info */}
          {(movie.cast?.length > 0 || movie.writer || movie.producer) && (
            <Card>
              <h2 className="text-2xl font-serif font-semibold text-vintage-brown mb-4">
                Cast & Crew
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movie.writer && (
                  <div>
                    <h3 className="font-medium text-vintage-brown mb-2">Writer</h3>
                    <p className="text-vintage-sepia">{movie.writer}</p>
                  </div>
                )}
                
                {movie.producer && (
                  <div>
                    <h3 className="font-medium text-vintage-brown mb-2">Producer</h3>
                    <p className="text-vintage-sepia">{movie.producer}</p>
                  </div>
                )}
                
                {movie.cast?.length > 0 && (
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-vintage-brown mb-2">Cast</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, index) => (
                        <Badge key={index} variant="secondary">
                          {actor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Reviews Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-vintage-brown">
                Reviews ({movie.totalReviews || 0})
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
              itemType="movie"
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
          itemType="movie"
          itemTitle={movie.title}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewModal(false)}
        />
      </Modal>
    </div>
  );
};

export default MovieDetail;
