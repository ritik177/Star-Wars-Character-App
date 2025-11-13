import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-12 min-h-[60vh]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-cyan-400 text-lg">Loading characters...</p>
      </div>
    </div>
  );
};

export default Loading;

