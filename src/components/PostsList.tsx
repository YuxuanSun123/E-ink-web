import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['-', 'general', 'weather', 'mood', 'friends', 'work', 'family', 'travel', 'food', 'other'] as const;

interface PostsListProps {
  onAddPost: () => void;
}

const PostsList: React.FC<PostsListProps> = ({ onAddPost }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('-');

  useEffect(() => {
    fetchPosts();

// Automatically refresh posts every 5 seconds
    const interval = setInterval(() => {
      console.log('Refreshing posts...'); 
      fetchPosts();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });

    if (selectedCategory !== '-') {
      query = query.eq('category', selectedCategory);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    const { data } = await query;
    if (data) setPosts(data);
  };

  return (
    <div className="max-w-4xl mx-auto text-black space-y-4 p-4">
      {/* Title & Add Post Button*/}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold uppercase">All Posts</h2>
        <button
          onClick={onAddPost}
          className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800"
        >
          + ADD POST
        </button>
      </div>

      {/* Category Filter & Search */}
      <div className="flex space-x-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-1/3 p-2 border-2 border-black bg-gray-100 text-black rounded-md"
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category === '-' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/3 p-2 border-2 border-black bg-gray-100 text-black rounded-md"
        />
      </div>

      {/* Post display area - Different adaptations for mobile phones and computers*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border-4 border-black p-6 rounded-md flex flex-col justify-between h-64">
            <h3 className="text-lg font-bold uppercase text-center">{post.title}</h3>

            <div className="flex-grow flex items-center justify-center">
              <p className="italic text-gray-700 text-center">{post.content}</p>
            </div>

            <p className="text-sm text-gray-500 text-center mt-auto">
              {post.display_name || 'Anonymous'} | {format(new Date(post.created_at), 'MMMM d, yyyy')} | {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;

