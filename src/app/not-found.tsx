// src/app/not-found.tsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h1 className="text-6xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
