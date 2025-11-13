import React from 'react';

const Pagination = ({ currentPage, hasNext, hasPrevious, onNext, onPrevious }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8 mb-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          hasPrevious
            ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
        }`}
      >
        Previous
      </button>
      <span className="text-cyan-400 font-medium">Page {currentPage}</span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          hasNext
            ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

