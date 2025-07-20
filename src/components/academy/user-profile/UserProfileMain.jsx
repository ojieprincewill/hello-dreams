import React, { useState } from "react";
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

const navItems = [
  { key: "learnings", label: "My Learnings", icon: <Home size={20} /> },
  { key: "security", label: "Account Security", icon: <Shield size={20} /> },
  { key: "settings", label: "Settings", icon: <Settings size={20} /> },
  { key: "help", label: "Help Center", icon: <HelpCircle size={20} /> },
];

const Sidebar = ({ active, setActive, onClose = null }) => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#eaecf0] flex flex-col py-8 px-2 shadow-md sticky top-0 left-0 z-10">
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
      <button className="mt-auto flex items-center gap-3 px-6 py-3 text-[#101828] hover:text-white hover:bg-[#ff7f50] font-medium text-[16px] rounded-lg transition-colors duration-200 cursor-pointer">
        <LogOut size={20} /> Log out
      </button>
    </aside>
  );
};

const MobileSidebar = ({ active, setActive, onClose }) => {
  return (
    <div className="fixed inset-0 z-90 lg:hidden">
      {/* Backdrop - only on tablet (md and up) */}
      <div
        className="fixed inset-0 bg-[#000000]/30 md:block hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-0 z-50 bg-white w-full md:w-80 transform transition-transform duration-300 ease-in-out">
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
          <button className="mt-auto flex items-center gap-3 px-6 py-3 text-[#101828] hover:text-white hover:bg-[#ff7f50] font-medium text-[16px] rounded-lg transition-colors duration-200 cursor-pointer">
            <LogOut size={20} /> Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfileMain = () => {
  const [active, setActive] = useState("learnings");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-[80vh]">
      {/* Desktop Sidebar - hidden on mobile/tablet, visible on desktop */}
      <div className="hidden lg:block">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Mobile/Tablet Menu Button - visible on mobile/tablet, hidden on desktop */}
      <div className="fixed top-4 md:top-25 left-4 z-80 lg:hidden ">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile/Tablet Sidebar - only shows when menu is open */}
      {isMobileMenuOpen && (
        <MobileSidebar
          active={active}
          setActive={setActive}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {active === "learnings" && <MyLearnings />}
        {active === "security" && <AccountSecurity />}
        {active === "settings" && <AccountSettings />}
        {active === "help" && <HelpCenter />}
      </main>
    </div>
  );
};

export default UserProfileMain;
