import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Filter, PenLine, Search, Trash2 } from 'lucide-react';
import { supabase } from './lib/supabase';

// 预定义类别
const CATEGORIES = [
  'general',
  'weather',
  'mood',
  'friends',
  'work',
  'family',
  'travel',
  'food',
  'other'
] as const;

// 定义帖子类型
type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  display_name: string | null;
  category: string;
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPosts(data);
    };

    fetchPosts();

    // 监听数据库变化
    const postsSubscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(postsSubscription);
    };
  }, []);

  const handleDeletePost = async (postId: string) => {
    if (isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) {
        alert(error.message);
      } else {
        setPosts(current => current.filter(post => post.id !== postId));
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      (post.display_name && post.display_name.toLowerCase().includes(searchLower));
    
    return matchesSearch && (!selectedCategory || post.category === selectedCategory);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <PenLine className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Group 3 pi</h1>
            </div>
            <div className="flex space-x-4 flex-1 sm:max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              No posts found matching your search criteria
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full mt-1">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
                    title="Delete post"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.display_name || 'Anonymous'}</span>
                  <time>{format(new Date(post.created_at), 'PPP')}</time>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default PostsPage;