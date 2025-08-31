import React, { useEffect, useState } from "react";
import { Users, UserCheck, Star, Clock, CheckCircle, UserX } from "lucide-react";
import StatCard from "./components/StatCard";
import UsersTable from "./components/UsersTable";
import api from "../../api"
import { ToastContainer } from "react-toastify";
import PhotographerTable from "./components/PhotographerTable";

const Admin = () => {
  const [collectStats, setCollectStats] = useState({
    totalUsers: 0,
    activePhotographers: 0,
    pendingBookings: 0,
    completedBookings: 0,
    pendingApprovals: 0,
    blockedUsers: 0,
  });

  const stats = {
    totalUsers: { subtitle: "Total No.of users registered" },
    activePhotographers: { subtitle: "No.of active photographers" },
    pendingBookings: { subtitle: "Needs attention" },
    completedBookings: { subtitle: "Total No.of Bookings completed" },
    pendingApprovals: { subtitle: "Photographers waiting for approval" },
    blockedUsers: { subtitle: "Security actions" },
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/admin/stats", {
          withCredentials: true,
        });
        console.log(res.data);
        setCollectStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white opacity-70">
            Manage your photography platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={collectStats.totalUsers}
            subtitle={stats.totalUsers.subtitle}
            icon={Users}
            color="text-blue-600"
          />
          <StatCard
            title="Active Photographers"
            value={collectStats.activePhotographers}
            subtitle={stats.activePhotographers.subtitle}
            icon={UserCheck}
            color="text-orange-600"
          />
          <StatCard
            title="Pending Bookings"
            value={collectStats.pendingBookings}
            subtitle={stats.pendingBookings.subtitle}
            icon={Clock}
            color="text-yellow-600"
          />
          <StatCard
            title="Completed Bookings"
            value={collectStats.completedBookings}
            subtitle={stats.completedBookings.subtitle}
            icon={CheckCircle}
            color="text-purple-600"
          />
          <StatCard
            title="Pending Approvals"
            value={collectStats.pendingApprovals}
            subtitle={stats.pendingApprovals.subtitle}
            icon={Star}
            color="text-green-600"
          />
          <StatCard
            title="Blocked Users"
            value={collectStats.blockedUsers}
            subtitle={stats.blockedUsers.subtitle}
            icon={UserX}
            color="text-red-600"
          />
        </div>

        {/* Photographer Management */}
        <PhotographerTable />
        {/* User Management */}
        <UsersTable />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Admin;
