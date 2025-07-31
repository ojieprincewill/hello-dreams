import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Activity, Clock, User, Calendar } from "lucide-react";
import { useInfiniteRecentActivities } from "../../../hooks/useInfiniteRecentActivities";

const RecentActivityManagement = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRecentActivities();

  // Extract all activities from the infinite query data
  const allActivities = data?.pages?.flatMap((page) => page.items || []) || [];

  const getActivityIcon = (type) => {
    switch (type) {
      case "user_registration":
        return <User size={16} className="text-blue-600" />;
      case "course_created":
        return <Calendar size={16} className="text-green-600" />;
      case "job_posted":
        return <Activity size={16} className="text-orange-600" />;
      case "challenge_created":
        return <Activity size={16} className="text-purple-600" />;
      case "blog_published":
        return <Activity size={16} className="text-indigo-600" />;
      default:
        return <Activity size={16} className="text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "user_registration":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "course_created":
        return "bg-green-50 border-l-4 border-green-500";
      case "job_posted":
        return "bg-orange-50 border-l-4 border-orange-500";
      case "challenge_created":
        return "bg-purple-50 border-l-4 border-purple-500";
      case "blog_published":
        return "bg-indigo-50 border-l-4 border-indigo-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-500";
    }
  };

  const formatActivityDescription = (activity) => {
    switch (activity.type) {
      case "user_registration":
        return `New user registered: ${activity.user_name || "Unknown User"}`;
      case "course_created":
        return `New course created: ${
          activity.course_title || "Untitled Course"
        }`;
      case "job_posted":
        return `New job posted: ${activity.job_title || "Untitled Job"}`;
      case "challenge_created":
        return `New challenge created: ${
          activity.challenge_title || "Untitled Challenge"
        }`;
      case "blog_published":
        return `New blog published: ${activity.blog_title || "Untitled Blog"}`;
      default:
        return activity.description || "Activity recorded";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 xl:space-y-8">
        <div>
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
            Recent Activity
          </h1>
          <p className="text-sm xl:text-base text-gray-600 mt-2">
            View all recent activities across the platform
          </p>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 xl:space-y-8">
      <div>
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
          Recent Activity
        </h1>
        <p className="text-sm xl:text-base text-gray-600 mt-2">
          View all recent activities across the platform
        </p>
      </div>

      <div className="space-y-4 xl:space-y-6">
        {allActivities.length > 0 ? (
          allActivities.map((activity, index) => (
            <Card
              key={activity.id || index}
              className={`hover:shadow-lg transition-shadow duration-200 ${getActivityColor(
                activity.type
              )}`}
            >
              <CardContent className="p-4 xl:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm xl:text-base font-medium text-gray-900">
                        {formatActivityDescription(activity)}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock size={12} className="xl:w-4 xl:h-4" />
                        <span>
                          {new Date(activity.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {activity.details && (
                      <p className="text-xs xl:text-sm text-gray-600 mb-2">
                        {activity.details}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {activity.user_name && (
                        <div className="flex items-center space-x-1">
                          <User size={12} className="xl:w-4 xl:h-4" />
                          <span>{activity.user_name}</span>
                        </div>
                      )}
                      {activity.created_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} className="xl:w-4 xl:h-4" />
                          <span>
                            {new Date(activity.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <Activity
              size={48}
              className="mx-auto text-gray-400 mb-4 xl:w-12 xl:h-12"
            />
            <p className="text-gray-500 text-lg">No recent activities found</p>
            <p className="text-gray-400 text-sm mt-2">
              Activities will appear here as they occur
            </p>
          </div>
        )}
      </div>

      {/* LOAD MORE */}
      {hasNextPage && (
        <div className="text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Activities"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityManagement;
