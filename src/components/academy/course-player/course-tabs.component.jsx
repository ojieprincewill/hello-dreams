import React, { useState } from "react";

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Q&A", key: "qa" },
  { label: "Notes", key: "notes" },
  { label: "Announcements", key: "announcements" },
  { label: "Review", key: "review" },
  { label: "Learning tools", key: "tools" },
];

const CourseTabs = ({ course, lessons = [] }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderOverview = () => (
    <div className="space-y-4">
      {course?.what_you_will_learn && (
        <div>
          <h4 className="text-lg font-semibold mb-2">What you'll learn</h4>
          <div className="text-gray-700 whitespace-pre-wrap">
            {course.what_you_will_learn}
          </div>
        </div>
      )}
      
      {course?.requirements && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Requirements</h4>
          <div className="text-gray-700 whitespace-pre-wrap">
            {course.requirements}
          </div>
        </div>
      )}

      {course?.target_audience && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Target Audience</h4>
          <div className="text-gray-700 whitespace-pre-wrap">
            {course.target_audience}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-lg font-semibold mb-2">Course Content</h4>
        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                <span className="text-gray-700">{lesson.title}</span>
              </div>
              <span className="text-sm text-gray-500">
                {lesson.video_duration_formatted || lesson.duration || '0:00'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQA = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">💬</div>
        <h4 className="text-lg font-semibold mb-2">Course Q&A</h4>
        <p className="text-gray-500">Ask questions and get answers from the instructor and other students.</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Ask a Question
        </button>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📝</div>
        <h4 className="text-lg font-semibold mb-2">Course Notes</h4>
        <p className="text-gray-500">Take notes while watching the course videos.</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Note
        </button>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📢</div>
        <h4 className="text-lg font-semibold mb-2">Course Announcements</h4>
        <p className="text-gray-500">Important updates and announcements from the instructor.</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">No announcements at the moment.</p>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-4">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">⭐</div>
        <h4 className="text-lg font-semibold mb-2">Course Reviews</h4>
        <p className="text-gray-500">See what other students are saying about this course.</p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">No reviews yet. Be the first to review this course!</p>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold mb-4">Learning Tools</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-2">📚 Resources</h5>
            <p className="text-sm text-gray-600">Download course materials and resources</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-2">📊 Progress</h5>
            <p className="text-sm text-gray-600">Track your learning progress</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-2">🎯 Certificates</h5>
            <p className="text-sm text-gray-600">Earn certificates upon completion</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h5 className="font-semibold mb-2">👥 Community</h5>
            <p className="text-sm text-gray-600">Connect with other learners</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "qa":
        return renderQA();
      case "notes":
        return renderNotes();
      case "announcements":
        return renderAnnouncements();
      case "review":
        return renderReview();
      case "tools":
        return renderTools();
      default:
        return renderOverview();
    }
  };

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
            className={`py-2 px-3 md:px-4 text-[16px] xl:text-[20px] whitespace-nowrap border-b-2 transition-colors duration-300 cursor-pointer ${
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
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CourseTabs;
