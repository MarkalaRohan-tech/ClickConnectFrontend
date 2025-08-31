import React, { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Clock,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import api from "../../api";

const User = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [bookingDetails, setBookingDetails] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    rejectedBookings: 0
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get(`/api/bookings/mine/${user.id}`);
        const data = res.data;
        setBookingDetails({
          totalBookings: data.totalBookings,
          completedBookings: data.completedBookings,
          pendingBookings: data.pendingBookings,
          rejectedBookings: data.rejectedBookings
        });
        setActivities(data.activities);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [user.id]);


  const stats = [
    {
      icon: Calendar,
      label: "Total Bookings",
      color: "text-black",
      count: bookingDetails.totalBookings,
    },
    {
      icon: Check,
      label: "Completed",
      color: "text-purple-600",
      count: bookingDetails.completedBookings,
    },
    {
      icon: Clock,
      label: "Pending",
      color: "text-yellow-600",
      count: bookingDetails.pendingBookings,
    },
    {
      icon: XCircle,
      label: "Rejected",
      color: "text-red-600",
      count: bookingDetails.rejectedBookings,
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "Completed":
        return <Star className="w-4 h-4 text-purple-600" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b-2 border-b-white rounded-2xl mx-5 px-6 py-6">
        <div className="max-w-6xl flex gap-5 items-center mx-auto">
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user.name}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Section */}
          {/* ...profile section unchanged... */}

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                {stat && stat.icon && stat.color && (
                  <div className={`flex justify-center ${stat.color} mb-3`}>
                    <div className="p-2 flex justify-center items-center text-2xl bg-opacity-10 rounded-lg">
                      <stat.icon className="w-6 h-6" />
                      &nbsp;
                      <p className="text-2xl font-bold">
                        {stat.count}
                      </p>
                    </div>
                  </div>
                )}
                {stat && stat.label && (
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                )}
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-black mb-6">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-black">
                        No recent activities
                      </h4>
                    </div>
                  </div>
                </div>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getActivityIcon(activity.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-black">
                          {activity.photographer}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            activity.status
                          )}`}
                        >
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{activity.event}</p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
