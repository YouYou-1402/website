# Vintage Blog API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.vintage-blog.com/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "data": {...},
  "message": "Optional message",
  "pagination": {...} // For paginated responses
}
```

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (Protected)
- `PUT /auth/profile` - Update profile (Protected)
- `PUT /auth/change-password` - Change password (Protected)

### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get single book
- `POST /books` - Create book (Protected)
- `PUT /books/:id` - Update book (Protected)
- `DELETE /books/:id` - Delete book (Protected)
- `GET /books/genres` - Get all genres

### Movies
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get single movie
- `POST /movies` - Create movie (Protected)
- `PUT /movies/:id` - Update movie (Protected)
- `DELETE /movies/:id` - Delete movie (Protected)
- `GET /movies/genres` - Get all genres

### Music
- `GET /music` - Get all music
- `GET /music/:id` - Get single music item
- `POST /music` - Create music (Protected)
- `PUT /music/:id` - Update music (Protected)
- `DELETE /music/:id` - Delete music (Protected)
- `GET /music/genres` - Get all genres

### Blog
- `GET /blog` - Get all blog posts
- `GET /blog/:id` - Get single blog post
- `POST /blog` - Create blog post (Protected)
- `PUT /blog/:id` - Update blog post (Protected)
- `DELETE /blog/:id` - Delete blog post (Protected)
- `POST /blog/:id/like` - Like/unlike post (Protected)

### Comments
- `GET /comments/post/:postId` - Get comments for post
- `POST /comments` - Create comment (Protected)
- `PUT /comments/:id` - Update comment (Protected)
- `DELETE /comments/:id` - Delete comment (Protected)
- `POST /comments/:id/like` - Like/unlike comment (Protected)

### Reviews
- `GET /reviews` - Get all reviews
- `POST /reviews` - Create review (Protected)
- `PUT /reviews/:id` - Update review (Protected)
- `DELETE /reviews/:id` - Delete review (Protected)
- `POST /reviews/:id/like` - Like/unlike review (Protected)
