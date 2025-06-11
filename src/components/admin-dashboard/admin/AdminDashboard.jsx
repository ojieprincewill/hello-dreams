import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DashboardOverview from "./DashboardOverview";
import CourseManagement from "./CourseManagement";
import JobManagement from "./JobManagement";
import ChallengeManagement from "./ChallengeManagement";
import BlogManagement from "./BlogManagement";
import CollectionsManagement from "./CollectionsManagement";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "courses":
        return <CourseManagement />;
      case "jobs":
        return <JobManagement />;
      case "challenges":
        return <ChallengeManagement />;
      case "blog":
        return <BlogManagement />;
      case "collections":
        return <CollectionsManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">{renderActiveSection()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
