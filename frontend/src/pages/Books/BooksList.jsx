import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const BooksList = () => {
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    author: '',
    year: '',
    sort: '-createdAt'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data: booksData, loading, error, refetch } = useApi(
    API_ENDPOINTS.BOOKS.LIST,
    {
      params: {
        ...filters,
        page: currentPage,
        limit: 12
      },
      dependencies: [filters, currentPage]
    }
  );

  const { data: genresData } = useApi(API_ENDPOINTS.BOOKS.GENRES);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the filter change
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      genre: '',
      author: '',
      year: '',
      sort: '-createdAt'
    });
    setCurrentPage(1);
  };

  if (loading && !booksData) {
    return <LoadingSpinner text="Loading books..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const books = booksData?.data || [];
  const pagination = booksData?.pagination || {};
  const genres = genresData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-vintage-brown mb-4">
          Books Collection
        </h1>
        <p className="text-lg text-vintage-sepia max-w-2xl">
          Discover timeless literature and contemporary classics in our curated collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vintage-sepia" />
              <Input
                type="text"
                placeholder="Search books by title, author, or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-vintage-brown mb-2">
                  Genre
                </label>
                <select
                  value={filters.genre}
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  className="vintage-input"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-sm font-medium text-vintage-brown mb-2">
                  Author
                </label>
                <Input
                  type="text"
                  placeholder="Filter by author"
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                />
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-vintage-brown mb-2">
                  Publication Year
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 1960"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-vintage-brown mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="vintage-input"
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="createdAt">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="-title">Title Z-A</option>
                  <option value="author">Author A-Z</option>
                  <option value="-author">Author Z-A</option>
                  <option value="-publishedYear">Publication Year (Newest)</option>
                  <option value="publishedYear">Publication Year (Oldest)</option>
                  <option value="-rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-vintage-sepia">
          {pagination.total ? (
            <>
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} books
            </>
          ) : (
            'No books found'
          )}
        </p>
      </div>

      {/* Books Grid */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-vintage-sepia text-lg mb-4">
            No books found matching your criteria
          </p>
          <Button onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

// Book Card Component
const BookCard = ({ book }) => (
  <Card hover={true} className="group h-full flex flex-col">
    <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
      <img
        src={book.coverImage || '/placeholder-book.jpg'}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    
    <div className="flex-1 flex flex-col space-y-2">
      {/* Genres */}
      <div className="flex flex-wrap gap-1">
        {book.genre?.slice(0, 2).map((genre) => (
          <Badge key={genre} size="sm">
            {genre}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-serif font-semibold text-vintage-brown group-hover:text-vintage-gold transition-colors line-clamp-2">
        <Link to={`/books/${book._id}`}>
          {book.title}
        </Link>
      </h3>

      {/* Author */}
      <p className="text-sm text-vintage-sepia">
        by {book.author}
      </p>

      {/* Description */}
      <p className="text-sm text-vintage-sepia line-clamp-2 flex-1">
        {book.description}
      </p>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-sm text-vintage-sepia pt-2 border-t border-vintage-lightbrown/30">
        <div className="flex items-center space-x-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{book.publishedYear}</span>
        </div>
        
        {book.rating > 0 && (
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-vintage-gold" />
            <span>{book.rating}</span>
            <span className="text-xs">({book.totalReviews})</span>
          </div>
        )}
      </div>
    </div>
  </Card>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    const halfShow = Math.floor(showPages / 2);
    
    let start = Math.max(1, currentPage - halfShow);
    let end = Math.min(totalPages, start + showPages - 1);
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous */}
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'outline'}
          onClick={() => onPageChange(page)}
          className="w-10 h-10 p-0"
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default BooksList;
