import React from 'react';

const LogoutButton = ({ onLogout, username }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-300 hidden md:inline">Welcome,</span>
      <div className="flex items-center gap-3">
        {/* Circular Avatar with First Letter */}
        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-cyan-400">
          <span className="text-black font-bold text-lg">{firstLetter}</span>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-gray-700 hover:border-cyan-500 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;

