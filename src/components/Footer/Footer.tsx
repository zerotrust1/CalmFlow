import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CalmFlow. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
