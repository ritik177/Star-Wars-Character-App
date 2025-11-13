import React from 'react';

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex justify-center items-center py-12 min-h-[60vh] px-4">
      <div className="text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-300 mb-6">{message || 'Failed to load characters. Please try again.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;

