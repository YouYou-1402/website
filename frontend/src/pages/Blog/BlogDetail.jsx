import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ErrorMessage from '../../components/UI/ErrorMessage';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import { 
  CalendarIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  ShareIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const BlogDetail = () => {
  const { id } = useParams();
  const { mutate } = useApiMutation();

  const { data: postData, loading, error, refetch } = useApi(
    API_ENDPOINTS.BLOG.DETAIL(id)
  );

  const { data: relatedPosts } = useApi(
    API_ENDPOINTS.BLOG.RELATED(id),
    { enabled: !!postData?.data }
  );

  // Increment view count when post loads
  useEffect(() => {
    if (postData?.data) {
      mutate('post', API_ENDPOINTS.BLOG.INCREMENT_VIEWS(id));
    }
  }, [postData, id, mutate]);

  if (loading) {
    return <LoadingSpinner text="Loading article..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const post = postData?.data;
  const related = relatedPosts?.data || [];

  if (!post) {
    return <ErrorMessage message="Article not found" />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to="/blog"
          className="inline-flex items-center text-vintage-sepia hover:text-vintage-brown transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="mb-12">
        <header className="mb-8">
          {/* Category */}
          <Badge variant="primary" className="mb-4">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-vintage-brown mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-vintage-sepia leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-vintage-sepia mb-6">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>by {post.author?.fullName || post.author?.username}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readingTime || '5'} min read</span>
            </div>
            
            {post.views > 0 && (
              <div className="flex items-center space-x-2">
                <EyeIcon className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
            )}

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 hover:text-vintage-brown transition-colors"
            >
              <ShareIcon className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-vintage prose-lg max-w-none">
          <div 
            className="text-vintage-sepia leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-8 pt-8 border-t border-vintage-lightbrown/30">
            <h3 className="text-sm font-medium text-vintage-brown mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author && (
          <Card className="mt-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-vintage-brown rounded-full flex items-center justify-center flex-shrink-0">
                {post.author.avatar ? (
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 text-vintage-cream" />
                )}
              </div>
              <div>
                <h3 className="font-serif font-semibold text-vintage-brown text-lg mb-1">
                  {post.author.fullName || post.author.username}
                </h3>
                {post.author.bio && (
                  <p className="text-vintage-sepia text-sm leading-relaxed">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-bold text-vintage-brown mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.slice(0, 4).map((relatedPost) => (
              <RelatedPostCard key={relatedPost._id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Related Post Card Component
const RelatedPostCard = ({ post }) => (
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
      
      <h3 className="font-serif font-semibold text-vintage-brown group-hover:text-vintage-gold transition-colors line-clamp-2">
        <Link to={`/blog/${post._id}`}>
          {post.title}
        </Link>
      </h3>
      
      <p className="text-sm text-vintage-sepia line-clamp-2">
        {post.excerpt}
      </p>
      
      <div className="flex items-center space-x-2 text-xs text-vintage-sepia">
        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.readingTime || '5'} min read</span>
      </div>
    </div>
  </Card>
);

export default BlogDetail;
