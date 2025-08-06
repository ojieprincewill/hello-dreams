import React from 'react';

const CoursePlayerSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[5%] py-10 flex flex-col xl:flex-row gap-8">
        {/* Main Section */}
        <div className="flex-1 min-w-0">
          {/* Video Player Skeleton */}
          <div className="w-full aspect-video bg-gray-200 rounded-lg animate-pulse mb-6" />
          
          {/* Tabs Skeleton */}
          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-200">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="py-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </div>

          {/* Course Info Skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4 mb-6" />
            <div className="py-5 border-t border-b border-gray-200 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-24 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="w-full xl:w-[340px] flex-shrink-0">
          <div className="border border-gray-200 p-1 shadow max-h-[700px] overflow-y-auto">
            <div className="bg-gray-100 p-4 mb-4">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-4" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayerSkeleton; 