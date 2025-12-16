import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-2xl font-bold text-gray-800">CalmFlow</span>
            </a>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/breathing" legacyBehavior>
              <a className="text-gray-600 hover:text-indigo-600">Breathing</a>
            </Link>
            <a href="#" className="text-gray-600 hover:text-indigo-600">Sounds</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
