import React from 'react';
import Link from 'next/link';

export default function NewNavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white/80 shadow-md backdrop-blur-sm z-50">
      <div className="flex items-center">
        <Link href="/" passHref>
          <span className="text-xl font-bold text-gray-800 cursor-pointer">
            CalmFlow
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/breathing" passHref>
          <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
            Breathing
          </span>
        </Link>
        <Link href="/scenes" passHref>
          <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
            Scenes
          </span>
        </Link>
        <Link href="/music" passHref>
          <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
            Music
          </span>
        </Link>
      </div>
    </nav>
  );
}
