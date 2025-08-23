import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['general', 'weather', 'mood', 'friends', 'work', 'family', 'travel', 'food', 'other'] as const;

type Props = {
  onPostSubmit: () => void;
  onViewPosts: () => void; //View post directly
};

const WritePost: React.FC<Props> = ({ onPostSubmit, onViewPosts }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    display_name: '',
    category: 'general'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('posts').insert({
      title: newPost.title,
      content: newPost.content,
      display_name: newPost.display_name || 'Anonymous',
      category: newPost.category
    });

    if (!error) {
      onPostSubmit();
    } else {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white border border-black p-6 rounded-lg shadow-md text-black">
      {/* title */}
      <h2 className="text-xl font-bold italic text-center uppercase mb-4">What would you like to say today?</h2>
      <hr className="border-black mb-4" />

      {/* Posting form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category selection*/}
        <select
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          className="block w-full p-3 border border-black bg-gray-200 text-black rounded-md"
        >
          {CATEGORIES.map(category => (
            <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
          ))}
        </select>

        {/* Name input */}
        <input
          type="text"
          value={newPost.display_name}
          onChange={(e) => setNewPost({ ...newPost, display_name: e.target.value })}
          className="block w-full p-3 border border-black bg-gray-100 rounded-md"
          placeholder="Display Name (optional)"
        />

        {/* Title input */}
        <input
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="block w-full p-3 border border-black bg-gray-100 rounded-md"
          placeholder="Title"
          required
        />

        {/*Content Input */}
        <textarea
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          rows={4}
          className="block w-full p-3 border border-black bg-gray-100 rounded-md"
          placeholder="Content"
          required
        />

        {/* Button area */}
        <div className="space-y-2">
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition"
          >
            SUBMIT
          </button>

          {/* Skip to view post button */}
          <button
            type="button"
            onClick={onViewPosts} // Click to jump to the post list
            className="w-full py-3 border border-black text-black text-lg font-semibold rounded-md hover:bg-gray-200 transition"
          >
            SKIP AND VIEW POSTS
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritePost;
