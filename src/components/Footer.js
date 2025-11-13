import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              © 2025 Ritik Patel. All rights reserved.
            </p>
            <p className="text-xs mt-1 text-gray-400">
              Built with React, JavaScript & Tailwind CSS
            </p>
          </div>

          {/* Right side */}
          <div className="text-center md:text-right">
            <p className="text-sm">
              Made with <span className="text-red-500">❤️</span> and lots of{' '}
              <span className="text-amber-600">☕</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

