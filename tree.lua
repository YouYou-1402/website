vintage-blog-website/
├── 📁 frontend/
│   ├── 📁 public/
│   │   ├── 📄 index.html
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 sitemap.xml
│   │   ├── 📄 robots.txt
│   │   └── 📁 assets/
│   │       ├── 📁 images/
│   │       │   ├── 📁 books/
│   │       │   ├── 📁 movies/
│   │       │   ├── 📁 music/
│   │       │   ├── 📁 avatars/
│   │       │   └── 📁 decorative/
│   │       ├── 📁 fonts/
│   │       │   ├── 📄 playfair-display.woff2
│   │       │   └── 📄 crimson-text.woff2
│   │       └── 📁 icons/
│   │
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 common/
│   │   │   │   ├── 📄 Header.js
│   │   │   │   ├── 📄 Navigation.js
│   │   │   │   ├── 📄 Footer.js
│   │   │   │   ├── 📄 Sidebar.js
│   │   │   │   ├── 📄 SearchBox.js
│   │   │   │   └── 📄 LoadingSpinner.js
│   │   │   │
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📄 LoginForm.js
│   │   │   │   ├── 📄 RegisterForm.js
│   │   │   │   ├── 📄 ForgotPassword.js
│   │   │   │   └── 📄 UserProfile.js
│   │   │   │
│   │   │   ├── 📁 books/
│   │   │   │   ├── 📄 BookCard.js
│   │   │   │   ├── 📄 BookList.js
│   │   │   │   ├── 📄 BookDetail.js
│   │   │   │   ├── 📄 BookReview.js
│   │   │   │   └── 📄 BookForm.js
│   │   │   │
│   │   │   ├── 📁 movies/
│   │   │   │   ├── 📄 MovieCard.js
│   │   │   │   ├── 📄 MovieList.js
│   │   │   │   ├── 📄 MovieDetail.js
│   │   │   │   ├── 📄 MovieReview.js
│   │   │   │   └── 📄 MovieForm.js
│   │   │   │
│   │   │   ├── 📁 music/
│   │   │   │   ├── 📄 MusicCard.js
│   │   │   │   ├── 📄 MusicList.js
│   │   │   │   ├── 📄 MusicDetail.js
│   │   │   │   ├── 📄 MusicReview.js
│   │   │   │   └── 📄 MusicForm.js
│   │   │   │
│   │   │   ├── 📁 blog/
│   │   │   │   ├── 📄 BlogCard.js
│   │   │   │   ├── 📄 BlogList.js
│   │   │   │   ├── 📄 BlogDetail.js
│   │   │   │   ├── 📄 BlogEditor.js
│   │   │   │   └── 📄 CommentSection.js
│   │   │   │
│   │   │   └── 📁 community/
│   │   │       ├── 📄 ForumList.js
│   │   │       ├── 📄 ForumThread.js
│   │   │       ├── 📄 PostForm.js
│   │   │       └── 📄 UserList.js
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── 📄 HomePage.js
│   │   │   ├── 📄 AboutPage.js
│   │   │   ├── 📄 ContactPage.js
│   │   │   │
│   │   │   ├── 📁 books/
│   │   │   │   ├── 📄 BooksPage.js
│   │   │   │   ├── 📄 BookDetailPage.js
│   │   │   │   ├── 📄 BooksByGenre.js
│   │   │   │   ├── 📄 BooksByAuthor.js
│   │   │   │   └── 📄 BookReviewsPage.js
│   │   │   │
│   │   │   ├── 📁 movies/
│   │   │   │   ├── 📄 MoviesPage.js
│   │   │   │   ├── 📄 MovieDetailPage.js
│   │   │   │   ├── 📄 MoviesByGenre.js
│   │   │   │   ├── 📄 MoviesByDirector.js
│   │   │   │   └── 📄 MovieReviewsPage.js
│   │   │   │
│   │   │   ├── 📁 music/
│   │   │   │   ├── 📄 MusicPage.js
│   │   │   │   ├── 📄 MusicDetailPage.js
│   │   │   │   ├── 📄 MusicByGenre.js
│   │   │   │   ├── 📄 MusicByArtist.js
│   │   │   │   └── 📄 MusicReviewsPage.js
│   │   │   │
│   │   │   ├── 📁 blog/
│   │   │   │   ├── 📄 BlogPage.js
│   │   │   │   ├── 📄 BlogPostPage.js
│   │   │   │   ├── 📄 BlogByTag.js
│   │   │   │   └── 📄 BlogArchive.js
│   │   │   │
│   │   │   ├── 📁 community/
│   │   │   │   ├── 📄 CommunityPage.js
│   │   │   │   ├── 📄 ForumPage.js
│   │   │   │   └── 📄 ThreadPage.js
│   │   │   │
│   │   │   └── 📁 auth/
│   │   │       ├── 📄 LoginPage.js
│   │   │       ├── 📄 RegisterPage.js
│   │   │       ├── 📄 ProfilePage.js
│   │   │       └── 📄 DashboardPage.js
│   │   │
│   │   ├── 📁 styles/
│   │   │   ├── 📄 globals.css
│   │   │   ├── 📄 vintage-theme.css
│   │   │   ├── 📄 components.css
│   │   │   ├── 📄 responsive.css
│   │   │   └── 📄 animations.css
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── 📄 api.js
│   │   │   ├── 📄 auth.js
│   │   │   ├── 📄 helpers.js
│   │   │   ├── 📄 constants.js
│   │   │   └── 📄 validation.js
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 useAuth.js
│   │   │   ├── 📄 useApi.js
│   │   │   └── 📄 useLocalStorage.js
│   │   │
│   │   ├── 📁 context/
│   │   │   ├── 📄 AuthContext.js
│   │   │   ├── 📄 ThemeContext.js
│   │   │   └── 📄 AppContext.js
│   │   │
│   │   ├── 📄 App.js
│   │   ├── 📄 index.js
│   │   └── 📄 routes.js
│   │
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   └── 📄 .env
│
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 authController.js
│   │   │   ├── 📄 userController.js
│   │   │   ├── 📄 bookController.js
│   │   │   ├── 📄 movieController.js
│   │   │   ├── 📄 musicController.js
│   │   │   ├── 📄 blogController.js
│   │   │   └── 📄 communityController.js
│   │   │
│   │   ├── 📁 models/
│   │   │   ├── 📄 User.js
│   │   │   ├── 📄 Book.js
│   │   │   ├── 📄 Movie.js
│   │   │   ├── 📄 Music.js
│   │   │   ├── 📄 BlogPost.js
│   │   │   ├── 📄 Comment.js
│   │   │   ├── 📄 Review.js
│   │   │   └── 📄 ForumPost.js
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── 📄 auth.js
│   │   │   ├── 📄 users.js
│   │   │   ├── 📄 books.js
│   │   │   ├── 📄 movies.js
│   │   │   ├── 📄 music.js
│   │   │   ├── 📄 blog.js
│   │   │   └── 📄 community.js
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── 📄 auth.js
│   │   │   ├── 📄 validation.js
│   │   │   ├── 📄 upload.js
│   │   │   └── 📄 errorHandler.js
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── 📄 database.js
│   │   │   ├── 📄 jwt.js
│   │   │   ├── 📄 email.js
│   │   │   └── 📄 helpers.js
│   │   │
│   │   ├── 📁 config/
│   │   │   ├── 📄 database.js
│   │   │   ├── 📄 cloudinary.js
│   │   │   └── 📄 cors.js
│   │   │
│   │   └── 📄 server.js
│   │
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   └── 📄 .env
│
├── 📁 database/
│   ├── 📁 migrations/
│   │   ├── 📄 001_create_users_table.sql
│   │   ├── 📄 002_create_books_table.sql
│   │   ├── 📄 003_create_movies_table.sql
│   │   ├── 📄 004_create_music_table.sql
│   │   ├── 📄 005_create_blog_posts_table.sql
│   │   ├── 📄 006_create_comments_table.sql
│   │   ├── 📄 007_create_reviews_table.sql
│   │   └── 📄 008_create_forum_posts_table.sql
│   │
│   ├── 📁 seeds/
│   │   ├── 📄 users.sql
│   │   ├── 📄 books.sql
│   │   ├── 📄 movies.sql
│   │   ├── 📄 music.sql
│   │   └── 📄 blog_posts.sql
│   │
│   └── 📄 schema.sql
│
├── 📁 admin/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📄 Dashboard.js
│   │   │   ├── 📄 UserManagement.js
│   │   │   ├── 📄 ContentManagement.js
│   │   │   └── 📄 Analytics.js
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── 📄 AdminLogin.js
│   │   │   ├── 📄 AdminDashboard.js
│   │   │   ├── 📄 ManageUsers.js
│   │   │   ├── 📄 ManageContent.js
│   │   │   └── 📄 Settings.js
│   │   │
│   │   └── 📄 AdminApp.js
│   │
│   └── 📄 package.json
│
├── 📁 docs/
│   ├── 📄 README.md
│   ├── 📄 API_DOCUMENTATION.md
│   ├── 📄 SETUP_GUIDE.md
│   ├── 📄 DEPLOYMENT.md
│   └── 📁 screenshots/
│
├── 📁 tests/
│   ├── 📁 frontend/
│   │   ├── 📄 components.test.js
│   │   └── 📄 pages.test.js
│   │
│   ├── 📁 backend/
│   │   ├── 📄 auth.test.js
│   │   ├── 📄 api.test.js
│   │   └── 📄 models.test.js
│   │
│   └── 📄 jest.config.js
│
├── 📁 deployment/
│   ├── 📄 Dockerfile
│   ├── 📄 docker-compose.yml
│   ├── 📄 nginx.conf
│   └── 📁 scripts/
│       ├── 📄 deploy.sh
│       └── 📄 backup.sh
│
├── 📄 .gitignore
├── 📄 .env.example
├── 📄 README.md
├── 📄 package.json
└── 📄 LICENSE
