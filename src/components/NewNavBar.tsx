import React from 'react';
import Link from 'next/link';

export default function NewNavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 bg-white/70 shadow-sm backdrop-blur-md z-50 border-b border-gray-200/50">
      <div className="flex items-center">
        <Link href="/" passHref>
          <span className="text-xl font-bold text-gray-800 cursor-pointer font-serif">
            CalmFlow
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/breathing" passHref>
          <span className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
            Breathing
          </span>
        </Link>
        <Link href="/scenes" passHref>
          <span className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
            Scenes
          </span>
        </Link>
        <Link href="/music" passHref>
          <span className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-300">
            Music
          </span>
        </Link>
      </div>
    </nav>
  );
}
