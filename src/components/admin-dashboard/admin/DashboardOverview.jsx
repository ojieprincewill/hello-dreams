import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Users,
  DollarSign,
  BookOpen,
  Briefcase,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { useDashboardData } from '../../../hooks/useDashboardData';

const DashboardOverview = ({ setActiveSection }) => {
  const { stats, activity } = useDashboardData();

  const loading = stats.isLoading || activity.isLoading;

  const statCards = [
    {
      title: 'Total Students',
      totalValue: stats.data?.totalStudents ?? '...',
      monthlyValue: stats.data?.studentsThisMonth ?? '...',
      change: `${stats.data?.studentChange ?? 0}%`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Revenue Generated',
      totalValue: stats.data
        ? `$${stats.data.totalRevenue.toLocaleString()}`
        : '...',
      monthlyValue: stats.data
        ? `$${stats.data.revenueThisMonth.toLocaleString()}`
        : '...',
      change: `${stats.data?.revenueChange ?? 0}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Courses',
      totalValue: stats.data?.totalCourses ?? '...',
      monthlyValue: stats.data?.coursesThisMonth ?? '...',
      change: `${stats.data?.courseChange ?? 0}%`,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Job Postings',
      totalValue: stats.data?.totalJobs ?? '...',
      monthlyValue: stats.data?.jobsThisMonth ?? '...',
      change: `${stats.data?.jobChange ?? 0}%`,
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const quickActions = [
    {
      title: 'Create Course',
      description: 'Add new learning content',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      section: 'courses',
    },
    {
      title: 'Post Job',
      description: 'Add job opportunity',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      section: 'jobs',
    },
    {
      title: 'New Challenge',
      description: 'Create UI/UX challenge',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      section: 'challenges',
    },
    {
      title: 'Write Article',
      description: 'Publish blog content',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      section: 'blog',
    },
  ];

  const handleQuickAction = (section) => {
    if (setActiveSection) {
      setActiveSection(section);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-2">
          Welcome back! Here's what's happening with Hello Dreams today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm lg:text-base font-medium text-gray-600 mb-2">
                      {stat.title}
                    </p>

                    {/* Total Value */}
                    <div className="mb-2">
                      <p className="text-lg lg:text-xl font-bold text-gray-900">
                        {stat.totalValue}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>

                    {/* Monthly Value */}
                    <div className="mb-3">
                      <p className="text-sm lg:text-base font-semibold text-gray-700">
                        {stat.monthlyValue}
                      </p>
                      <p className="text-xs text-gray-500">This Month</p>
                    </div>

                    {/* Change Indicator */}
                    <div className="flex items-center">
                      {parseFloat(stat.change) >= 0 ? (
                        <TrendingUp
                          size={14}
                          className="text-green-500 mr-1 lg:w-4 lg:h-4"
                        />
                      ) : (
                        <TrendingUp
                          size={14}
                          className="rotate-180 text-red-500 mr-1 lg:w-4 lg:h-4"
                        />
                      )}
                      <span
                        className={`text-xs lg:text-sm font-medium ${
                          parseFloat(stat.change) >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-2 lg:p-3 rounded-full ${stat.bgColor} flex-shrink-0 ml-3`}
                  >
                    <Icon size={20} className={`${stat.color} lg:w-6 lg:h-6`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3 lg:pb-6">
            <CardTitle className="text-lg lg:text-xl">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3 lg:space-y-4">
                {activity.data?.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-2 lg:p-3 rounded-lg ${
                      index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs lg:text-sm font-medium truncate">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {activity.data && activity.data.length > 0 && (
                  <button
                    onClick={() => setActiveSection('activity')}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                  >
                    View All Activities →
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 lg:pb-6">
            <CardTitle className="text-lg lg:text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.section)}
                    className={`p-3 lg:p-4 ${action.bgColor} ${action.hoverColor} rounded-lg transition-colors text-left cursor-pointer`}
                  >
                    <Icon
                      className={`${action.color} mb-2 lg:w-6 lg:h-6`}
                      size={20}
                    />
                    <p
                      className={`font-medium text-sm lg:text-base ${action.color
                        .replace('text-', 'text-')
                        .replace('-600', '-900')}`}
                    >
                      {action.title}
                    </p>
                    <p className={`text-xs lg:text-sm ${action.color}`}>
                      {action.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
