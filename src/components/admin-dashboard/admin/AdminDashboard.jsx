import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import DashboardOverview from "./DashboardOverview";
import CourseManagement from "./CourseManagement";
import JobManagement from "./JobManagement";
import ChallengeManagement from "./ChallengeManagement";
import BlogManagement from "./BlogManagement";
import CollectionsManagement from "./CollectionsManagement";
import CohortsManagement from "./CohortsManagement";
import RecentActivityManagement from "./RecentActivityManagement";
import UserManagement from "./UserManagement";
import { Menu, X } from "lucide-react";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set up real-time subscriptions for all admin tables
  useRealtimeSubscriptions();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview setActiveSection={setActiveSection} />;
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
      case "cohorts":
        return <CohortsManagement />;
      case "activity":
        return <RecentActivityManagement />;
      case "users":
        return <UserManagement />;
      default:
        return <DashboardOverview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 xl:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out xl:fixed xl:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between  ">
          {/* <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1> */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="xl:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AdminSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onSectionChange={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 xl:ml-64">
        <div className="p-4 xl:p-8">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
