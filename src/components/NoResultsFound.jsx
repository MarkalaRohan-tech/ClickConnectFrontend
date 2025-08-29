import React from "react";
import { Search, Camera, ArrowLeft } from "lucide-react";

const NoResultsFound = ({ searchQuery, onClearSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Animated Camera Icon */}
      <div className="relative mb-8">
        <div className="animate-pulse">
          <Camera className="w-24 h-24 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Search className="w-8 h-8 text-gray-300" />
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-bold text-white mb-4">
          No Photographers Found
        </h2>

        <p className="text-gray-300 text-lg mb-2">
          We couldn't find any photographers matching
        </p>

        <p className="text-white text-xl font-semibold mb-6 bg-gray-800 px-4 py-2 rounded-lg inline-block">
          "{searchQuery}"
        </p>
      </div>

      {/* Suggestions */}
      <div className="text-center mb-8">
        <h3 className="text-white text-lg font-semibold mb-3">
          Try these suggestions:
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            Check your spelling
          </li>
          <li className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
            Use more general keywords
          </li>
          <li className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
            Try searching by location or genre
          </li>
        </ul>
      </div>

      {/* Back Button with Animation */}
      <button
        onClick={onClearSearch}
        className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to All Photographers
      </button>

      {/* Animated Dots */}
      <div className="flex space-x-2 mt-8">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200"></div>
      </div>

      {/* Floating Elements Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gray-600 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gray-500 rounded-full animate-pulse opacity-10"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-gray-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-gray-600 rounded-full animate-ping opacity-5 delay-500"></div>
      </div>
    </div>
  );
};

export default NoResultsFound;
