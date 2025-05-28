const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../backend/src/models/User');
const Book = require('../../backend/src/models/Book');
const Movie = require('../../backend/src/models/Movie');
const Music = require('../../backend/src/models/Music');
const BlogPost = require('../../backend/src/models/BlogPost');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const users = [
    {
      username: 'admin',
      email: 'admin@vintage-blog.com',
      password: 'admin123',
      fullName: 'Admin User',
      role: 'admin',
      bio: 'Website administrator and content curator'
    },
    {
      username: 'bookworm',
      email: 'bookworm@example.com',
      password: 'password123',
      fullName: 'Sarah Johnson',
      bio: 'Passionate reader and book reviewer'
    },
    {
      username: 'moviebuff',
      email: 'moviebuff@example.com',
      password: 'password123',
      fullName: 'Mike Chen',
      bio: 'Cinema enthusiast and film critic'
    },
    {
      username: 'musiclover',
      email: 'musiclover@example.com',
      password: 'password123',
      fullName: 'Emma Davis',
      bio: 'Music journalist and vinyl collector'
    }
  ];

  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  console.log('✅ Users seeded');
  return createdUsers;
};

const seedBooks = async (users) => {
  const books = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      genre: ['Classic', 'Drama'],
      publishedYear: 1960,
      isbn: '978-0-06-112008-4',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      createdBy: users[1]._id,
      tags: ['classic', 'american-literature', 'social-justice']
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel about totalitarian control.',
      genre: ['Science Fiction', 'Dystopian', 'Classic'],
      publishedYear: 1949,
      isbn: '978-0-452-28423-4',
      coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop',
      createdBy: users[1]._id,
      tags: ['dystopian', 'political', 'surveillance']
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A classic American novel about the Jazz Age and the American Dream.',
      genre: ['Classic', 'Romance', 'Drama'],
      publishedYear: 1925,
      isbn: '978-0-7432-7356-5',
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      createdBy: users[0]._id,
      tags: ['jazz-age', 'american-dream', 'tragedy']
    }
  ];

  await Book.deleteMany({});
  const createdBooks = await Book.insertMany(books);
  console.log('✅ Books seeded');
  return createdBooks;
};

const seedMovies = async (users) => {
  const movies = [
    {
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      description: 'Two imprisoned men bond over years, finding solace and redemption.',
      genre: ['Drama', 'Crime'],
      releaseYear: 1994,
      duration: 142,
      poster: 'https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=300&h=450&fit=crop',
      createdBy: users[2]._id,
      tags: ['prison', 'friendship', 'hope']
    },
    {
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
      description: 'The lives of two mob hitmen, a boxer, and others intertwine.',
      genre: ['Crime', 'Drama', 'Thriller'],
      releaseYear: 1994,
      duration: 154,
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
      createdBy: users[2]._id,
      tags: ['nonlinear', 'crime', 'cult-classic']
    },
    {
      title: 'Casablanca',
      director: 'Michael Curtiz',
      cast: ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid'],
      description: 'A cynical nightclub owner protects an old flame and her husband.',
      genre: ['Romance', 'Drama', 'War'],
      releaseYear: 1942,
      duration: 102,
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
      createdBy: users[0]._id,
      tags: ['classic', 'romance', 'world-war-ii']
    }
  ];

  await Movie.deleteMany({});
  const createdMovies = await Movie.insertMany(movies);
  console.log('✅ Movies seeded');
  return createdMovies;
};

const seedMusic = async (users) => {
  const music = [
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      description: 'An epic rock opera that defied conventional song structure.',
      genre: ['Rock', 'Progressive Rock', 'Opera'],
      releaseYear: 1975,
      duration: '5:55',
      coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      createdBy: users[3]._id,
      tags: ['queen', 'rock-opera', 'classic-rock']
    },
    {
      title: 'Hotel California',
      artist: 'Eagles',
      album: 'Hotel California',
      description: 'A mysterious song about excess and the American Dream.',
      genre: ['Rock', 'Country Rock'],
      releaseYear: 1976,
      duration: '6:30',
      coverArt: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=300&h=300&fit=crop',
      createdBy: users[3]._id,
      tags: ['eagles', 'american-dream', '70s-rock']
    },
    {
      title: 'Imagine',
      artist: 'John Lennon',
      album: 'Imagine',
      description: 'A song about peace and unity that became an anthem.',
      genre: ['Pop', 'Rock', 'Folk'],
      releaseYear: 1971,
      duration: '3:07',
      coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
      createdBy: users[0]._id,
      tags: ['john-lennon', 'peace', 'anthem']
    }
  ];

  await Music.deleteMany({});
  const createdMusic = await Music.insertMany(music);
  console.log('✅ Music seeded');
  return createdMusic;
};

const seedBlogPosts = async (users) => {
  const blogPosts = [
    {
      title: 'The Timeless Appeal of Classic Literature',
      content: `
        Classic literature continues to captivate readers across generations, and for good reason. These works have stood the test of time not merely because they're old, but because they explore universal themes that remain relevant today.

        Take "To Kill a Mockingbird" by Harper Lee, for instance. Published in 1960, this novel tackles issues of racial injustice, moral growth, and the loss of innocence. Despite being set in the 1930s American South, its themes resonate powerfully in our contemporary discussions about equality and justice.

        Similarly, George Orwell's "1984" feels more prescient than ever in our digital age. The concepts of surveillance, truth manipulation, and authoritarian control that Orwell explored have found new relevance in our era of social media, data collection, and political polarization.

        What makes these books "classic" isn't just their age or literary merit—it's their ability to speak to fundamental human experiences and societal challenges that transcend time and place. They offer us mirrors to examine our own world and windows to understand different perspectives.

        Reading classics also connects us to a broader cultural conversation. These books have influenced countless other works, shaped our language, and contributed to our collective understanding of literature and life. When we read them, we're participating in a dialogue that spans centuries.

        For modern readers, classics offer several benefits:
        - **Historical perspective**: Understanding how people thought and lived in different eras
        - **Literary foundation**: Appreciating the techniques and styles that influenced modern writing
        - **Cultural literacy**: Recognizing references and allusions in contemporary works
        - **Timeless wisdom**: Gaining insights into human nature and society that remain relevant

        The key to enjoying classic literature is approaching it with an open mind and understanding the context in which it was written. Don't be intimidated by the language or cultural differences—instead, see them as opportunities to expand your perspective and understanding.
      `,
      excerpt: 'Exploring why classic literature continues to captivate readers and remain relevant in our modern world.',
      featuredImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
      author: users[1]._id,
      category: 'books',
      tags: ['classic-literature', 'reading', 'timeless-themes'],
      isPublished: true,
      publishedAt: new Date('2024-01-15')
    },
    {
      title: 'The Evolution of Cinema: From Silent Films to Digital Masterpieces',
      content: `
        Cinema has undergone a remarkable transformation since its inception over a century ago. From the silent films of Charlie Chaplin to today's CGI-heavy blockbusters, the medium has continuously evolved while maintaining its core purpose: storytelling.

        The silent era (1890s-1920s) established many fundamental principles of filmmaking. Directors like D.W. Griffith pioneered techniques such as close-ups, cross-cutting, and parallel editing that remain essential today. Without dialogue, filmmakers had to rely purely on visual storytelling, creating a universal language that transcended cultural barriers.

        The introduction of synchronized sound in the late 1920s revolutionized cinema. "The Jazz Singer" (1927) marked the beginning of the "talkies," fundamentally changing how stories were told on screen. This technological leap eliminated some careers while creating new opportunities for actors with compelling voices.

        The Golden Age of Hollywood (1930s-1950s) established the studio system and created the star system we recognize today. Films like "Casablanca," "Gone with the Wind," and "Citizen Kane" set standards for storytelling, cinematography, and performance that continue to influence filmmakers.

        The 1960s and 70s brought the New Hollywood movement, with directors like Martin Scorsese, Francis Ford Coppola, and Steven Spielberg challenging conventional narratives and techniques. This era produced more personal, auteur-driven films that reflected the social upheaval of the times.

        The digital revolution of the 1990s and 2000s transformed both production and distribution. CGI allowed filmmakers to create impossible worlds and scenarios, while digital cameras democratized filmmaking. Today, anyone with a smartphone can create and distribute content globally.

        Key technological milestones in cinema:
        - **1895**: First public film screening by the Lumière Brothers
        - **1927**: First synchronized sound film
        - **1939**: "The Wizard of Oz" popularizes Technicolor
        - **1977**: "Star Wars" revolutionizes special effects
        - **1995**: "Toy Story" - first fully computer-animated feature
        - **2009**: "Avatar" advances 3D technology

        Despite technological advances, the fundamentals of good filmmaking remain unchanged: compelling characters, engaging stories, and emotional resonance. The best films, whether from 1942 or 2024, connect with audiences on a human level.

        As we look to the future, emerging technologies like virtual reality, artificial intelligence, and streaming platforms continue to reshape how we create and consume cinema. Yet the magic of movies—their ability to transport us to different worlds and help us understand ourselves—remains as powerful as ever.
      `,
      excerpt: 'A journey through cinema history, exploring how technology and artistry have shaped the movies we love.',
      featuredImage: 'https://images.unsplash.com/photo-1489599735734-79b4169c4388?w=800&h=400&fit=crop',
      author: users[2]._id,
      category: 'movies',
      tags: ['cinema-history', 'film-technology', 'movie-evolution'],
      isPublished: true,
      publishedAt: new Date('2024-01-20')
    },
    {
      title: 'Vinyl Revival: Why Physical Music Still Matters in the Digital Age',
      content: `
        In an era of streaming services and digital downloads, vinyl records are experiencing an unexpected renaissance. Sales have grown consistently for over a decade, with 2023 marking another record year. But why are people choosing to buy physical music in our increasingly digital world?

        The answer lies in the unique experience that vinyl provides—something that digital formats, despite their convenience, cannot replicate.

        **The Ritual of Listening**
        Playing a vinyl record is a deliberate act. You must choose the album, remove it from its sleeve, place it on the turntable, and drop the needle. This ritual creates a mindful listening experience that contrasts sharply with the passive consumption enabled by streaming playlists.

        **Album Art as Art**
        Vinyl's large format (12 inches) transforms album covers into genuine art pieces. The tactile experience of holding a record, reading liner notes, and examining artwork creates a deeper connection between listener and artist. Digital thumbnails simply cannot provide the same impact.

        **Sound Quality Debate**
        While audiophiles debate whether vinyl sounds "better" than digital formats, many listeners prefer vinyl's warm, analog sound. The subtle imperfections—surface noise, slight wow and flutter—add character that some find more engaging than pristine digital reproduction.

        **Collectibility and Discovery**
        Vinyl collecting has become a hobby in itself. Limited editions, colored vinyl, and rare pressings create a treasure-hunting aspect that digital music lacks. Record stores have become cultural hubs where music lovers discover new artists and connect with fellow enthusiasts.

        **Supporting Artists**
        Physical sales typically provide better compensation for artists than streaming. A vinyl purchase might equal hundreds or thousands of streams in terms of artist revenue, making it a more direct way to support musicians.

        **The Complete Experience**
        Vinyl encourages listening to complete albums rather than individual tracks. This aligns with many artists' intentions, as albums are often conceived as cohesive artistic statements rather than collections of singles.

        **Notable Vinyl Statistics:**
        - Vinyl sales have grown for 16 consecutive years
        - 2023 saw over 43 million vinyl records sold in the US
        - Vinyl now accounts for 70% of physical music sales
        - Artists from Taylor Swift to Harry Styles regularly release special vinyl editions

        The vinyl revival isn't just nostalgia—it represents a desire for tangible, meaningful experiences in our digital world. While streaming offers unparalleled convenience and discovery, vinyl provides something equally valuable: intentionality, artistry, and connection.

        For many, vinyl and digital formats complement rather than compete with each other. Streaming serves for discovery and convenience, while vinyl provides the full, immersive experience for favorite albums. This hybrid approach allows music lovers to enjoy the best of both worlds.

        As we move forward, vinyl's continued success suggests that despite technological advances, there's still a place for physical media that engages multiple senses and creates lasting memories. In our rush toward digital convenience, vinyl reminds us that sometimes, the old ways still have value.
      `,
      excerpt: 'Exploring the unexpected resurgence of vinyl records and what it means for music culture in the streaming age.',
      featuredImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      author: users[3]._id,
      category: 'music',
      tags: ['vinyl', 'music-culture', 'physical-media'],
      isPublished: true,
      publishedAt: new Date('2024-01-25')
    }
  ];

  await BlogPost.deleteMany({});
  const createdPosts = await BlogPost.insertMany(blogPosts);
  console.log('✅ Blog posts seeded');
  return createdPosts;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    const users = await seedUsers();
    const books = await seedBooks(users);
    const movies = await seedMovies(users);
    const music = await seedMusic(users);
    const blogPosts = await seedBlogPosts(users);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log(`Created: ${users.length} users, ${books.length} books, ${movies.length} movies, ${music.length} music items, ${blogPosts.length} blog posts`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
