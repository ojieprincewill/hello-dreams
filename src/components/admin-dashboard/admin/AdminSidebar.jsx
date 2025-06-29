import React from 'react';
import { cn } from '../lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Users,
  FileText,
  PlusCircle,
  BarChart3,
  ShoppingBag,
  X,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'jobs', label: 'Job Postings', icon: Briefcase },
  { id: 'challenges', label: 'UI/UX Challenges', icon: Users },
  { id: 'blog', label: 'Blog Articles', icon: FileText },
  { id: 'collections', label: 'Collections', icon: ShoppingBag },
];

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 lg:w-64 bg-white border-r border-gray-200 shadow-sm h-full">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              Hello Dreams
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">
              Admin Portal
            </p>
          </div>
          <button className="lg:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
      </div>

      <nav className="p-2 lg:p-4 space-y-1 lg:space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-all duration-200 cursor-pointer text-sm lg:text-base',
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <Icon size={18} className="lg:w-5 lg:h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
