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
  CalendarIcon,
  ClockIcon,
  UserIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const BlogList = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    author: '',
    sort: '-publishedAt'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data: postsData, loading, error, refetch } = useApi(
    API_ENDPOINTS.BLOG.LIST,
    {
      params: {
        ...filters,
        page: currentPage,
        limit: 10,
        status: 'published'
      },
      dependencies: [filters, currentPage]
    }
  );

  const { data: categoriesData } = useApi(API_ENDPOINTS.BLOG.CATEGORIES);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      author: '',
      sort: '-publishedAt'
    });
    setCurrentPage(1);
  };

  if (loading && !postsData) {
    return <LoadingSpinner text="Loading blog posts..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const posts = postsData?.data || [];
  const pagination = postsData?.pagination || {};
  const categories = categoriesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-vintage-brown mb-4">
          Cultural Blog
        </h1>
        <p className="text-lg text-vintage-sepia max-w-2xl">
          Thoughtful insights about art, culture, literature, and the creative spirit
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vintage-sepia" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-vintage-brown mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="vintage-input"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  <option value="-publishedAt">Newest First</option>
                  <option value="publishedAt">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="-title">Title Z-A</option>
                  <option value="-views">Most Popular</option>
                  <option value="-commentsCount">Most Discussed</option>
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
              {pagination.total} articles
            </>
          ) : (
            'No articles found'
          )}
        </p>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-8 mb-8">
          {posts.map((post, index) => (
            <BlogCard key={post._id} post={post} featured={index === 0} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-vintage-sepia text-lg mb-4">
            No articles found matching your criteria
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

// Blog Card Component
const BlogCard = ({ post, featured = false }) => {
  const cardClass = featured 
    ? "lg:flex lg:space-x-6" 
    : "md:flex md:space-x-4";
  
  const imageClass = featured 
    ? "lg:w-1/2 aspect-video" 
    : "md:w-1/3 aspect-video";

  return (
    <Card hover={true} className={`group ${cardClass}`}>
      {/* Featured Image */}
      <div className={`${imageClass} mb-4 md:mb-0 overflow-hidden rounded-lg`}>
        <img
          src={post.featuredImage || '/placeholder-blog.jpg'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className={`${featured ? 'lg:w-1/2' : 'md:w-2/3'} flex flex-col justify-between`}>
        <div className="space-y-3">
          {/* Category & Reading Time */}
          <div className="flex items-center space-x-2">
            <Badge variant="primary">{post.category}</Badge>
            <span className="text-sm text-vintage-sepia">
              {post.readingTime || '5'} min read
            </span>
          </div>

          {/* Title */}
          <h2 className={`font-serif font-bold text-vintage-brown group-hover:text-vintage-gold transition-colors ${
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          }`}>
            <Link to={`/blog/${post._id}`}>
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className={`text-vintage-sepia leading-relaxed ${
            featured ? 'text-base' : 'text-sm'
          } line-clamp-3`}>
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} size="sm" variant="secondary">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge size="sm" variant="secondary">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-vintage-lightbrown/30 mt-4">
          <div className="flex items-center space-x-4 text-sm text-vintage-sepia">
            <div className="flex items-center space-x-1">
              <UserIcon className="w-4 h-4" />
              <span>{post.author?.fullName || post.author?.username}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-vintage-sepia">
            {post.views > 0 && (
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            )}
            <Link 
              to={`/blog/${post._id}`}
              className="vintage-link text-sm"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Pagination Component (reuse)
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
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

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

export default BlogList;
