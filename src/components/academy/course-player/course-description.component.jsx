import React, { useState } from "react";

const CourseDescription = ({
  description = `Web Design is fun. It's creative.

It gives you a huge self-satisfaction when you look at your work and say, "I made this!", ... (rest of your description here)`,
}) => {
  const [expanded, setExpanded] = useState(false);

  // For demo, split by lines and show only first 8 if not expanded
  const lines = description.split("\n");
  const preview = lines.slice(0, 8).join("\n");
  const showLoadMore = lines.length > 8 && !expanded;

  return (
    <div className="mb-10">
      <h3 className="text-[16px] font-bold mb-2">Description</h3>
      <div className="text-[15px] text-gray-800 whitespace-pre-line">
        {expanded ? description : preview}
      </div>
      {showLoadMore && (
        <button
          className="mt-3 px-4 py-2 border border-gray-300 rounded text-[14px] font-medium bg-white hover:bg-gray-100 transition"
          onClick={() => setExpanded(true)}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default CourseDescription;
