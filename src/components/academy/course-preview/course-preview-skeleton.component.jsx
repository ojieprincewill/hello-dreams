import React from 'react';

const CoursePreviewSkeleton = () => {
  return (
    <div className="px-[5%] py-10">
      {/* Course Image Skeleton */}
      <div className="bg-gray-200 h-[180px] xl:h-[338px] md:h-[240px] rounded-md animate-pulse mb-6" />

      <div className="py-6 xl:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Course Title and Description Skeleton */}
            <div className="space-y-3 xl:space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
            </div>

            {/* Course Content Skeleton */}
            <div className="space-y-3 md:space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-12" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Skeleton */}
            <div className="xl:space-y-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              <ul className="list-disc pl-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                ))}
              </ul>
            </div>

            {/* Description Skeleton */}
            <div className="xl:space-y-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>

            {/* Certificate Skeleton */}
            <div className="xl:space-y-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              <div className="h-[260px] xl:h-[574px] md:h-[350px] bg-gray-200 rounded-2xl animate-pulse" />
            </div>

            {/* Instructor Skeleton */}
            <div className="xl:space-y-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-40" />
              <div className="flex flex-col items-start md:flex-row md:items-center space-x-0 md:space-x-4">
                <div className="w-full h-[180px] md:w-[162px] md:h-[198px] bg-gray-200 rounded-xl animate-pulse mb-4 md:mb-0" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="xl:col-span-1">
            <div className="border-[1.5px] border-gray-200 rounded-xl">
              <div className="p-4 border-b-[1.5px] border-b-gray-200">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-6" />
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
              </div>

              <div className="p-4 my-2 border-b-[1.5px] border-b-gray-200">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-3" />
                <div className="h-[240px] bg-gray-200 rounded-2xl animate-pulse" />
              </div>

              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-16 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewSkeleton; 