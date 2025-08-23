import React from 'react';
import BenchImage from '../assets/YZ.png'; 

type Props = {
  onStart: () => void;
};

const Welcome: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="text-center space-y-6">
      {/* picture */}
      <img src={BenchImage} alt="Bench" className="mx-auto h-32 w-auto" />

      <h1 className="text-3xl font-bold uppercase">WELCOME TO THE COMMUNITY PLAQUE</h1>
      <p className="text-lg italic text-gray-700">
        Join the conversation and share your <span className="text-gray-900 font-semibold">bench-pondering thoughts</span>
      </p>

      <button
        onClick={onStart}
        className="px-6 py-3 bg-black text-white rounded-md text-lg font-semibold hover:bg-gray-800 transition"
      >
        SHARE NOW
      </button>
    </div>
  );
};

export default Welcome;
