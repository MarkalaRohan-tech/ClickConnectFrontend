import React, { useEffect, useState } from "react";
import { UserX, CheckSquare, Trash, AlertCircle, Users } from "lucide-react";
import StatusBadge from "./StatusBadge";
import api from "../../api";

const UserTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("🔄 Starting to fetch users...");
      setLoading(true);
      setError(null);

      const res = await api.get("/api/admin/users", {
        withCredentials: true,
        timeout: 10000,
      });

      console.log("✅ Users fetched:", res.data);
      setUsersData(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);

      let errorMessage = "Failed to load users";

      if (err.code === "ECONNABORTED") {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response?.status === 401) {
        errorMessage = "Authentication required. Please login again.";
      } else if (err.response?.status === 403) {
        errorMessage = "Access denied. Admin privileges required.";
      } else if (err.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      }

      setError(errorMessage);
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete user "${userName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await api.delete(`/api/admin/users/${id}`, {
        withCredentials: true,
        timeout: 5000,
      });
      setUsersData((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      const errorMsg = err.response?.data?.message || "Failed to delete user";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await api.patch(
        `/api/admin/users/${id}/approve`,
        { status: "approved" }, // Send status in body
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      const updatedUser = res.data;
      setUsersData((prev) =>
        prev.map((u) =>
          u._id === id
            ? {
                ...u,
                status: updatedUser.status,
                isActive: updatedUser.isActive,
              }
            : u
        )
      );
    } catch (err) {
      console.error("Approve error:", err);
      const errorMsg = err.response?.data?.message || "Failed to approve user";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleReject = async (id, userName) => {
    if (!window.confirm(`Are you sure you want to block user "${userName}"?`)) {
      return;
    }

    try {
      const res = await api.patch(
        `/api/admin/users/${id}/block`,
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      const updatedUser = res.data;
      setUsersData((prev) =>
        prev.map((u) =>
          u._id === id
            ? {
                ...u,
                status: updatedUser.status,
                isActive: updatedUser.isActive,
              }
            : u
        )
      );
    } catch (err) {
      console.error("Block error:", err);
      const errorMsg = err.response?.data?.message || "Failed to block user";
      alert(`Error: ${errorMsg}`);
    }
  };

  // Debug: Log the current state
  console.log("🔍 Current state:", {
    loading,
    error,
    dataLength: usersData.length,
  });

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl mb-5 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">User Management</h3>
        </div>
        <div className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">Loading users...</p>
              <p className="text-sm text-gray-500">
                This may take a few seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-red-200 rounded-xl mb-5 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-red-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">User Management</h3>
        </div>
        <div className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <div className="space-y-2">
              <p className="text-red-600 font-semibold text-lg">
                Something went wrong
              </p>
              <p className="text-red-500 max-w-md">{error}</p>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={fetchUsers}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-5 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">User Management</h3>
        <button
          onClick={fetchUsers}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Show count */}
      {usersData.length > 0 && (
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {usersData.length} user{usersData.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">
                        No users found
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        There are no users registered yet.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              usersData.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {user.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "?"}
                      </div>
                      <div className="text-sm text-gray-900 font-medium">
                        {user.name || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge
                      status={user.isActive ? "approved" : "blocked"}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="text-gray-600 cursor-pointer hover:text-green-600 transition-colors p-1 rounded"
                        title="Approve user"
                        disabled={user.isActive}
                      >
                        <CheckSquare
                          className={`w-4 h-4 ${
                            user.isActive ? "text-green-500" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleReject(user._id, user.name)}
                        className="text-gray-600 cursor-pointer hover:text-orange-600 transition-colors p-1 rounded"
                        title="Block user"
                        disabled={!user.isActive}
                      >
                        <UserX
                          className={`w-4 h-4 ${
                            !user.isActive ? "text-orange-500" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id, user.name)}
                        className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors p-1 rounded"
                        title="Delete user"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
