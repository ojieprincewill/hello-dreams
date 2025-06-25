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

const DashboardOverview = () => {
  const { stats, activity } = useDashboardData();

  const loading = stats.isLoading || activity.isLoading;

  const statCards = [
    {
      title: 'Total Students',
      value: stats.data?.totalStudents ?? '...',
      change: `${stats.data?.studentChange ?? 0}%`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Revenue Generated',
      value: stats.data ? `$${stats.data.revenue.toLocaleString()}` : '...',
      change: `${stats.data?.revenueChange ?? 0}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Courses',
      value: stats.data?.activeCourses ?? '...',
      change: `${stats.data?.courseChange ?? 0}%`,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Job Postings',
      value: stats.data?.jobPostings ?? '...',
      change: `${stats.data?.jobChange ?? 0}%`,
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with Hello Dreams today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {parseFloat(stat.change) >= 0 ? (
                        <TrendingUp size={16} className="text-green-500 mr-1" />
                      ) : (
                        <TrendingUp
                          size={16}
                          className="rotate-180 text-red-500 mr-1"
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          parseFloat(stat.change) >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-4">
                {activity.data?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'
                    }`}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{item.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions stay unchanged */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Buttons here as before */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
