import React, { useState, useEffect } from "react";
import {
  Home,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import MyLearnings from "./MyLearnings";
import AccountSecurity from "./AccountSecurity";
import AccountSettings from "./AccountSettings";
import HelpCenter from "./HelpCenter";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useCourseProgress } from "@/hooks/useCourseProgress";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner.component";

const navItems = [
  { key: "learnings", label: "My Learning", icon: <Home size={20} /> },
  { key: "security", label: "Account Security", icon: <Shield size={20} /> },
  { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  { key: "help", label: "Help Center", icon: <HelpCircle size={20} /> },
];

const Sidebar = ({
  active,
  setActive,
  onClose = null,
  onLogout,
  user,
  profile,
  isFetching,
}) => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#eaecf0] flex flex-col py-8 px-2 shadow-md sticky top-0 left-0 z-10">
      {/* User Info */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#1342ff] rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {profile?.first_name && profile?.last_name
              ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`
              : user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#101828] text-sm">
              {profile?.first_name && profile?.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : user?.email || "User"}
            </h3>
            <p className="text-[#667085] text-xs">
              {profile?.role || "Student"}
            </p>
          </div>
          {/* Background sync indicator */}
          {isFetching && (
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
              title="Syncing data..."
            ></div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`w-full flex items-center gap-3 px-6 py-3 rounded-lg text-left font-medium text-[16px] transition-colors duration-200 relative cursor-pointer
              ${
                active === item.key
                  ? "bg-[#1342ff] text-white font-bold"
                  : "text-[#101828] hover:bg-[#f7f7f7]"
              }
            `}
            onClick={() => setActive(item.key)}
            aria-current={active === item.key ? "page" : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 px-6 py-3 text-[#101828] hover:text-white hover:bg-[#ff7f50] font-medium text-[16px] rounded-lg transition-colors duration-200 cursor-pointer"
      >
        <LogOut size={20} /> Log out
      </button>
    </aside>
  );
};

const MobileSidebar = ({
  active,
  setActive,
  onClose,
  onLogout,
  user,
  profile,
  isFetching,
}) => {
  return (
    <div className="fixed inset-0 z-90 xl:hidden">
      {/* Backdrop - only on tablet (md and up) */}
      <div
        className="fixed inset-0 bg-[#000000]/30 md:block hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-white w-full md:w-80 transform transition-transform duration-300 ease-in-out"
      >
        <div className="w-full h-full flex flex-col py-8 px-2">
          <div className="flex justify-between items-center px-6 mb-6">
            <h2 className="text-xl font-bold text-[#101828]">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="px-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#1342ff] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {profile?.first_name && profile?.last_name
                  ? `${profile.first_name.charAt(0)}${profile.last_name.charAt(
                      0
                    )}`
                  : user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#101828] text-sm">
                  {profile?.first_name && profile?.last_name
                    ? `${profile.first_name} ${profile.last_name}`
                    : user?.email || "User"}
                </h3>
                <p className="text-[#667085] text-xs">
                  {profile?.role || "Student"}
                </p>
              </div>
              {/* Background sync indicator */}
              {isFetching && (
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  title="Syncing data..."
                ></div>
              )}
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-6 py-3 rounded-lg text-left font-medium text-[16px] transition-colors duration-200 relative cursor-pointer
                  ${
                    active === item.key
                      ? "bg-[#1342ff] text-white font-bold"
                      : "text-[#101828] hover:bg-[#f7f7f7]"
                  }
                `}
                onClick={() => {
                  setActive(item.key);
                  onClose();
                }}
                aria-current={active === item.key ? "page" : undefined}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={onLogout}
            className="mt-auto flex items-center gap-3 px-6 py-3 text-[#101828] hover:text-white hover:bg-[#ff7f50] font-medium text-[16px] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <LogOut size={20} /> Log out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const UserProfileMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAuthenticated } = useAuth();
  const {
    profile,
    isLoading: profileLoading,
    isFetching: profileFetching,
    error: profileError,
  } = useProfile();
  const { isFetching: courseProgressFetching } = useCourseProgress();

  const initialTab = location.state?.active || "learnings";
  const [active, setActive] = useState(initialTab);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  // Handle authentication redirect in useEffect
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/signin");
  //   }
  // }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await signOut.mutateAsync();
      navigate("/academy");
      handleOrigins();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show minimal loading only if no profile data exists at all
  if (profileLoading && !profile) {
    return <LoadingSpinner />;
  }

  const isFetching = profileFetching || courseProgressFetching;

  // Debug information (remove in production)
  if (profileError) {
    console.log("Profile Error Details:", {
      error: profileError,
      user: user?.id,
      isAuthenticated,
      profile,
    });
  }

  return (
    <div className="flex min-h-[80vh]">
      {/* Desktop Sidebar - hidden on mobile/tablet, visible on desktop */}
      <div className="hidden xl:block">
        <Sidebar
          active={active}
          setActive={setActive}
          onLogout={handleLogout}
          user={user}
          profile={profile}
          isFetching={isFetching}
        />
      </div>

      {/* Mobile/Tablet Menu Button - visible on mobile/tablet, hidden on desktop */}
      <div className="fixed top-4 md:top-25 left-4 z-70 xl:hidden ">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile/Tablet Sidebar - only shows when menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileSidebar
            active={active}
            setActive={setActive}
            onClose={() => setIsMobileMenuOpen(false)}
            onLogout={handleLogout}
            user={user}
            profile={profile}
            isFetching={isFetching}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 xl:ml-0">
        {active === "learnings" && <MyLearnings />}
        {active === "security" && <AccountSecurity />}
        {active === "settings" && <AccountSettings />}
        {active === "help" && <HelpCenter />}
      </main>
    </div>
  );
};

export default UserProfileMain;
