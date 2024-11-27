import React from "react";

interface SkeletonLoaderProps {
  count?: number; // Number of skeleton loaders to display
  className?: string; // Additional class names for customization
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 1, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-10 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div>
          <div
          key={index}
          className="animate-pulse bg-gray-600 rounded-lg h-72 w-80 flex space-x-4 items-center"
        >          
        </div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-500 rounded w-3/4 mt-2"></div>
            <div className="h-4 bg-gray-500 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
