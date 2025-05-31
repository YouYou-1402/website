import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  UserIcon,
  PencilIcon,
  BookOpenIcon,
  FilmIcon,
  MusicalNoteIcon,
  ChatBubbleLeftIcon,
  MapPinIcon,
  GlobeAltIcon,
  CalendarIcon,
  HeartIcon,
  StarIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock data for demo - thay thế API calls bằng mock data
  const userStats = {
    booksReviewed: 12,
    moviesReviewed: 8,
    musicReviewed: 15,
    blogPosts: 5,
    totalLikes: 234,
    followers: 89,
    following: 156
  };

  const recentReviews = [
    {
      id: 1,
      type: 'book',
      title: '',
      rating: 5,
      comment: '',
      date: ''
    },
    {
      id: 2,
      type: '',
      title: '',
      rating: 4,
      comment: '',
      date: ''
    },
    {
      id: 3,
      type: '',
      title: '',
      rating: 5,
      comment: '',
      date: ''
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in context
      updateUser({ ...user, ...formData });
      setIsEditing(false);
      
      // Show success message (you can add toast notification here)
      console.log('Profile updated successfully');
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra khi cập nhật thông tin' });
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book': return BookOpenIcon;
      case 'movie': return FilmIcon;
      case 'music': return MusicalNoteIcon;
      default: return ChatBubbleLeftIcon;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'book': return 'text-blue-600 bg-blue-100';
      case 'movie': return 'text-purple-600 bg-purple-100';
      case 'music': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'book': return 'Sách';
      case 'movie': return 'Phim';
      case 'music': return 'Nhạc';
      default: return 'Khác';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-18 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 relative">
            {/* Bamboo pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="bambooPattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
                    <rect x="18" y="0" width="4" height="60" fill="white" opacity="0.3"/>
                    <rect x="18" y="15" width="4" height="2" fill="white" opacity="0.5"/>
                    <rect x="18" y="30" width="4" height="2" fill="white" opacity="0.5"/>
                    <rect x="18" y="45" width="4" height="2" fill="white" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bambooPattern)"/>
              </svg>
            </div>
            
            <div className="absolute bottom-4 left-6 flex items-end space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.fullName || user.email} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg transition-colors">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              
              {/* User Info */}
              <div className="text-white pb-2">
                <h1 className="text-2xl font-bold">{user.fullName || user.email}</h1>
                <p className="text-green-100">@{user.username || user.email.split('@')[0]}</p>
              </div>
            </div>
            
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
            >
              <PencilIcon className="w-4 h-4" />
              <span>{isEditing ? 'Hủy' : 'Chỉnh sửa'}</span>
            </button>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa điểm
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      placeholder="Thành phố, Quốc gia"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giới thiệu bản thân
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Viết vài dòng về bản thân, sở thích văn hóa Việt Nam..."
                  />
                </div>
                
                {errors.general && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {errors.general}
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    )}
                    <span>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Display */
              <div className="space-y-6">
                {/* Bio */}
                {(user.bio || formData.bio) ? (
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{user.bio || formData.bio}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500 italic">Chưa có thông tin giới thiệu</p>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-green-600 hover:text-green-700 font-medium mt-2"
                    >
                      Thêm giới thiệu
                    </button>
                  </div>
                )}
                
                {/* Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {(user.location || formData.location) && (
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4 text-green-600" />
                      <span>{user.location || formData.location}</span>
                    </div>
                  )}
                  {(user.website || formData.website) && (
                    <div className="flex items-center space-x-1">
                      <GlobeAltIcon className="w-4 h-4 text-green-600" />
                      <a 
                        href={user.website || formData.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-600 hover:text-green-700 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4 text-green-600" />
                    <span>Tham gia tháng 5, 2024</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <BookOpenIcon className="w-5 h-5 text-green-600 mr-2" />
                Thống kê hoạt động
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Sách đánh giá</span>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">{userStats.booksReviewed}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FilmIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">Phim đánh giá</span>
                  </div>
                  <span className="font-bold text-purple-600 text-lg">{userStats.moviesReviewed}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MusicalNoteIcon className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Nhạc đánh giá</span>
                  </div>
                  <span className="font-bold text-green-600 text-lg">{userStats.musicReviewed}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700 font-medium">Lượt thích</span>
                  </div>
                  <span className="font-bold text-red-600 text-lg">{userStats.totalLikes}</span>
                </div>
              </div>
            </div>

            {/* Followers */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <HeartIcon className="w-5 h-5 text-green-600 mr-2" />
                Kết nối
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.followers}</div>
                  <div className="text-sm text-gray-600 font-medium">Người theo dõi</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{userStats.following}</div>
                  <div className="text-sm text-gray-600 font-medium">Đang theo dõi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <ChatBubbleLeftIcon className="w-5 h-5 text-green-600 mr-2" />
                Đánh giá gần đây
              </h3>
              <div className="space-y-4">
                {recentReviews.map((review) => {
                  const Icon = getTypeIcon(review.type);
                  return (
                    <div key={review.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-green-300">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(review.type)}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.title}</h4>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {getTypeName(review.type)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{review.comment}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {recentReviews.length === 0 && (
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có đánh giá nào</p>
                  <p className="text-sm text-gray-400">Hãy bắt đầu đánh giá những tác phẩm văn hóa yêu thích!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;