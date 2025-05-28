import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { API_ENDPOINTS } from '../config/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { 
  BookOpenIcon, 
  FilmIcon, 
  MusicalNoteIcon,
  NewspaperIcon,
  ArrowRightIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  // Fetch recent content
  const { data: recentBooks, loading: booksLoading } = useApi(API_ENDPOINTS.BOOKS.LIST, {
    params: { limit: 3, sort: '-createdAt' }
  });

  const { data: recentMovies, loading: moviesLoading } = useApi(API_ENDPOINTS.MOVIES.LIST, {
    params: { limit: 3, sort: '-createdAt' }
  });

  const { data: recentMusic, loading: musicLoading } = useApi(API_ENDPOINTS.MUSIC.LIST, {
    params: { limit: 3, sort: '-createdAt' }
  });

  const { data: recentPosts, loading: postsLoading } = useApi(API_ENDPOINTS.BLOG.LIST, {
    params: { limit: 3, sort: '-publishedAt' }
  });

  const heroFeatures = [
    {
      icon: BookOpenIcon,
      title: 'Classic Literature',
      description: 'Discover timeless books that have shaped literature',
      href: '/books',
      color: 'text-blue-600'
    },
    {
      icon: FilmIcon,
      title: 'Vintage Cinema',
      description: 'Explore classic films and cinematic masterpieces',
      href: '/movies',
      color: 'text-purple-600'
    },
    {
      icon: MusicalNoteIcon,
      title: 'Timeless Music',
      description: 'Listen to music that transcends generations',
      href: '/music',
      color: 'text-green-600'
    },
    {
      icon: NewspaperIcon,
      title: 'Cultural Blog',
      description: 'Read insights about art, culture, and creativity',
      href: '/blog',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vintage-cream via-white to-vintage-lightbrown/20 py-20">
        <div className="absolute inset-0 bg-vintage-paper opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-vintage-brown mb-6 vintage-text-shadow">
              Welcome to Vintage
            </h1>
            <p className="text-xl md:text-2xl text-vintage-sepia mb-8 max-w-3xl mx-auto leading-relaxed">
              A curated collection of timeless books, classic films, vintage music, 
              and thoughtful cultural commentary
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/books" className="vintage-btn text-lg">
                Explore Collection
              </Link>
              <Link to="/blog" className="vintage-btn-outline text-lg">
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-vintage-brown mb-4">
              Discover Cultural Treasures
            </h2>
            <p className="text-lg text-vintage-sepia max-w-2xl mx-auto">
              Immerse yourself in carefully curated content that celebrates 
              the enduring beauty of art and culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  hover={true}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-vintage-gold/20 to-vintage-brown/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-vintage-brown mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-vintage-sepia mb-4">
                    {feature.description}
                  </p>
                  <Link 
                    to={feature.href}
                    className="inline-flex items-center text-vintage-brown hover:text-vintage-gold transition-colors font-medium"
                  >
                    Explore
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-vintage-brown">
              Recent Books
            </h2>
            <Link 
              to="/books"
              className="vintage-link flex items-center"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {booksLoading ? (
            <LoadingSpinner />
          ) : recentBooks?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBooks.data.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-vintage-sepia py-8">
              No books available yet.
            </p>
          )}
        </div>
      </section>

      {/* Recent Movies */}
      <section className="py-16 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-vintage-brown">
              Recent Movies
            </h2>
            <Link 
              to="/movies"
              className="vintage-link flex items-center"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {moviesLoading ? (
            <LoadingSpinner />
          ) : recentMovies?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentMovies.data.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-vintage-sepia py-8">
              No movies available yet.
            </p>
          )}
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold text-vintage-brown">
              Latest Articles
            </h2>
            <Link 
              to="/blog"
              className="vintage-link flex items-center"
            >
              View All
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {postsLoading ? (
            <LoadingSpinner />
          ) : recentPosts?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.data.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-vintage-sepia py-8">
              No blog posts available yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

// Book Card Component
const BookCard = ({ book }) => (
  <Card hover={true} className="group">
    <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
      <img
        src={book.coverImage || '/placeholder-book.jpg'}
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {book.genre?.slice(0, 2).map((g) => (
          <Badge key={g} size="sm">{g}</Badge>
        ))}
      </div>
      <h3 className="font-serif font-semibold text-vintage-brown group-hover:text-vintage-gold transition-colors">
        <Link to={`/books/${book._id}`}>{book.title}</Link>
      </h3>
      <p className="text-sm text-vintage-sepia">by {book.author}</p>
      <div className="flex items-center space-x-2 text-sm text-vintage-sepia">
        <span>{book.publishedYear}</span>
        {book.rating > 0 && (
          <>
            <span>•</span>
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 text-vintage-gold" />
              <span className="ml-1">{book.rating}</span>
            </div>
          </>
        )}
      </div>
    </div>
  </Card>
);

// Movie Card Component
const MovieCard = ({ movie }) => (
  <Card hover={true} className="group">
    <div className="aspect-[2/3] mb-4 overflow-hidden rounded-lg">
      <img
        src={movie.poster || '/placeholder-movie.jpg'}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {movie.genre?.slice(0, 2).map((g) => (
          <Badge key={g} size="sm">{g}</Badge>
        ))}
      </div>
      <h3 className="font-serif font-semibold text-vintage-brown group-hover:text-vintage-gold transition-colors">
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      </h3>
      <p className="text-sm text-vintage-sepia">by {movie.director}</p>
      <div className="flex items-center space-x-2 text-sm text-vintage-sepia">
        <span>{movie.releaseYear}</span>
        <span>•</span>
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4" />
          <span className="ml-1">{movie.duration}min</span>
        </div>
        {movie.rating > 0 && (
          <>
            <span>•</span>
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 text-vintage-gold" />
              <span className="ml-1">{movie.rating}</span>
            </div>
          </>
        )}
      </div>
    </div>
  </Card>
);

// Blog Card Component (tiếp)
const BlogCard = ({ post }) => (
  <Card hover={true} className="group">
    <div className="aspect-video mb-4 overflow-hidden rounded-lg">
      <img
        src={post.featuredImage || '/placeholder-blog.jpg'}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="space-y-2">
      <Badge size="sm" variant="primary">{post.category}</Badge>
      <h3 className="font-serif font-semibold text-vintage-brown group-hover:text-vintage-gold transition-colors">
        <Link to={`/blog/${post._id}`}>{post.title}</Link>
      </h3>
      <p className="text-sm text-vintage-sepia line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center space-x-2 text-xs text-vintage-sepia">
        <span>by {post.author?.fullName || post.author?.username}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
      </div>
    </div>
  </Card>
);

export default Home;
