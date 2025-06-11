import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Users,
  DollarSign,
  BookOpen,
  Briefcase,
  TrendingUp,
  FileText,
} from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Revenue Generated",
      value: "$47,390",
      change: "+23.1%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+3",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Job Postings",
      value: "18",
      change: "+5",
      icon: Briefcase,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
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
        {stats.map((stat, index) => {
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
                      <TrendingUp size={16} className="text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">
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
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">
                    New course "Advanced UI Design" published
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">
                    Job posting "Senior UX Designer" created
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New UI challenge posted</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <BookOpen className="text-blue-600 mb-2" size={24} />
                <p className="font-medium text-blue-900">Create Course</p>
                <p className="text-xs text-blue-600">
                  Add new learning content
                </p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <Briefcase className="text-green-600 mb-2" size={24} />
                <p className="font-medium text-green-900">Post Job</p>
                <p className="text-xs text-green-600">Add job opportunity</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <Users className="text-purple-600 mb-2" size={24} />
                <p className="font-medium text-purple-900">New Challenge</p>
                <p className="text-xs text-purple-600">
                  Create UI/UX challenge
                </p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                <FileText className="text-orange-600 mb-2" size={24} />
                <p className="font-medium text-orange-900">Write Article</p>
                <p className="text-xs text-orange-600">Publish blog content</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
