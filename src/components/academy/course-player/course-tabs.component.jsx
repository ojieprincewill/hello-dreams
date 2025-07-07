import React, { useState } from "react";

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Q&A", key: "qa" },
  { label: "Notes", key: "notes" },
  { label: "Announcements", key: "announcements" },
  { label: "Review", key: "review" },
  { label: "Learning tools", key: "tools" },
];

const CourseTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="mt-6">
      {/* Tab List */}
      <div
        className="flex justify-between items-center border-b border-[#cccccc] overflow-x-auto md:overflow-x-visible"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-3 md:px-4 text-[16px] lg:text-[20px] whitespace-nowrap border-b-2 transition-colors duration-300 cursor-pointer ${
              activeTab === tab.key
                ? "border-b-4 border-[#667085] text-[#010413]"
                : "border-transparent text-[#667085] hover:text-[#010413]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === "overview" && (
          <div>
            {/* Placeholder: Replace with real Overview content */}
            <p className="text-gray-700">Overview content goes here.</p>
          </div>
        )}
        {activeTab === "qa" && (
          <div>
            <p className="text-gray-700">Q&A content goes here.</p>
          </div>
        )}
        {activeTab === "notes" && (
          <div>
            <p className="text-gray-700">Notes content goes here.</p>
          </div>
        )}
        {activeTab === "announcements" && (
          <div>
            <p className="text-gray-700">Announcements content goes here.</p>
          </div>
        )}
        {activeTab === "review" && (
          <div>
            <p className="text-gray-700">Review content goes here.</p>
          </div>
        )}
        {activeTab === "tools" && (
          <div>
            <p className="text-gray-700">Learning tools content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTabs;
