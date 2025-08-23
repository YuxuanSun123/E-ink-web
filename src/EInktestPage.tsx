// This is the code that was originally written to adapt to the LCD screen in order to prevent the ink screen from not working properly. 
// It has been abandoned and may be used as a multi-screen expansion display in the future.
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from './lib/supabase';

// Predefined categories
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

// Define post type
type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  display_name: string | null;
  category: string;
};

const EInkPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setPosts(data);
    };

    fetchPosts();

//Monitor database changes
    const postsSubscription = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, fetchPosts)
      .subscribe();

// Automatically refresh data every 5 seconds
    const interval = setInterval(fetchPosts, 5000);

    return () => {
      supabase.removeChannel(postsSubscription);
      clearInterval(interval);
    };
  }, []);

  const filteredPosts = posts.filter(post => 
    !selectedCategory || post.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-xl font-bold text-center border-b border-black pb-2">E-Ink Display</h1>
      
      <div className="text-center my-4">
        <label htmlFor="category" className="mr-2">All Categories:</label>
        <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border p-2">
          <option value="">All Categories</option>
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          ))}
        </select>
      </div>

      <main className="mt-4 space-y-4">
        {filteredPosts.map((post) => (
          <article key={post.id} className="border border-black p-3">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm mt-1">{post.content}</p>
            <div className="text-xs text-gray-700 mt-2">
              <span>{post.display_name || 'Anonymous'}</span>
              <span className="ml-4">{format(new Date(post.created_at), 'PPP')}</span>
              <span className="ml-4 font-bold">category: {post.category}</span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default EInkPage;

