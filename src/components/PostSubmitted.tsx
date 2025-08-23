import React from 'react';

type Props = {
  onViewPosts: () => void;
};

const PostSubmitted: React.FC<Props> = ({ onViewPosts }) => {
  return (
    <div className="max-w-lg mx-auto text-center text-black">
      {/* title */}
      <h2 className="text-2xl font-bold uppercase mb-4">THANK YOU FOR THE SUBMISSION!</h2>

      {/* Secondary Text*/}
      <p className="text-lg italic text-gray-700 mb-8">
        Check out what other people have <br /> said while sitting:
      </p>

      {/*Button */}
      <button
        onClick={onViewPosts}
        className="w-48 py-3 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-800 transition"
      >
        VIEW POSTS
      </button>
    </div>
  );
};

export default PostSubmitted;

