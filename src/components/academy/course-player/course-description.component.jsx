import React, { useState } from 'react';

const CourseDescription = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!course?.description) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-500">No description available for this course.</p>
      </div>
    );
  }

  const description = course.description;
  const maxLength = 300;
  const shouldTruncate = description.length > maxLength;
  const displayText = showFullDescription ? description : description.slice(0, maxLength);

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Description</h3>
      <div className="text-gray-700 leading-relaxed">
        <p className="whitespace-pre-wrap">{displayText}</p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDescription;
