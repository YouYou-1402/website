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
  BookOpenIcon,
  UserIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const BookDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: bookData, loading, error, refetch } = useApi(
    API_ENDPOINTS.BOOKS.DETAIL(id)
  );

  const { mutate } = useApiMutation();

  if (loading) {
    return <LoadingSpinner text="Loading book details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const book = bookData?.data;
  const reviews = book?.reviews || [];

  if (!book) {
    return <ErrorMessage message="Book not found" />;
  }

  const handleReviewSubmit = async (reviewData) => {
    const result = await mutate('post', API_ENDPOINTS.REVIEWS.CREATE, {
      ...reviewData,
      itemType: 'book',
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
          <li><Link to="/books" className="vintage-link">Books</Link></li>
          <li>/</li>
          <li className="text-vintage-brown">{book.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover & Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            {/* Cover Image */}
            <div className="aspect-[3/4] mb-6 overflow-hidden rounded-lg">
              <img
                src={book.coverImage || '/placeholder-book.jpg'}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="space-y-4">
              {/* Rating */}
              {book.averageRating > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {renderStars(book.averageRating)}
                  </div>
                  <span className="font-medium text-vintage-brown">
                    {book.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm text-vintage-sepia">
                    ({book.totalReviews} reviews)
                  </span>
                </div>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {book.genre?.map((genre) => (
                  <Badge key={genre} variant="primary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Published: {book.publishedYear}</span>
                </div>
                
                {book.isbn && (
                  <div className="flex items-center space-x-2 text-vintage-sepia">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 text-vintage-sepia">
                  <UserIcon className="w-4 h-4" />
                  <span>Added by: {book.createdBy?.fullName || book.createdBy?.username}</span>
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
          {/* Book Header */}
          <div>
            <h1 className="text-4xl font-serif font-bold text-vintage-brown mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-vintage-sepia mb-4">
              by <span className="font-medium">{book.author}</span>
            </p>
            
            {/* Tags */}
            {book.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
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
              About This Book
            </h2>
            <div className="prose prose-vintage max-w-none">
              <p className="text-vintage-sepia leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          </Card>

          {/* Reviews Section */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-semibold text-vintage-brown">
                Reviews ({book.totalReviews || 0})
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
              itemType="book"
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
          itemType="book"
          itemTitle={book.title}
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowReviewModal(false)}
        />
      </Modal>
    </div>
  );
};

export default BookDetail;
