import React, { useEffect, useState } from "react";
import { UserX, Star, CheckSquare, Trash, AlertCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import axios from "axios";

const PhotographerTable = () => {
  const [photographersData, setPhotographersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotographers();
  }, []);

  const fetchPhotographers = async () => {
    try {
      console.log("🔄 Starting to fetch photographers..."); // Debug log
      setLoading(true);
      setError(null);

      const res = await axios.get("/api/admin/photographers", {
        withCredentials: true,
        timeout: 10000, // 10 second timeout
      });

      console.log("✅ Photographers fetched:", res.data); // Debug log
      setPhotographersData(res.data || []); // Ensure it's always an array
    } catch (err) {
      console.error("❌ Failed to fetch photographers:", err);

      // More detailed error handling
      let errorMessage = "Failed to load photographers";

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
      console.log("🏁 Setting loading to false"); // Debug log
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photographer?")) {
      return;
    }

    try {
      await axios.delete(`/api/admin/photographers/${id}`, {
        withCredentials: true,
        timeout: 5000,
      });
      setPhotographersData((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      const errorMsg =
        err.response?.data?.message || "Failed to delete photographer";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(
        `/api/admin/photographers/${id}/approve`,
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      const updatedData = res.data;

      // Update frontend list with new status
      setPhotographersData((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status: updatedData.status,
                isActive: updatedData.isActive,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Approve error:", err);
      const errorMsg =
        err.response?.data?.message || "Failed to approve photographer";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to block this photographer?")) {
      return;
    }

    try {
      await axios.patch(
        `/api/admin/photographers/${id}/block`,
        {},
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      // Update UI after successful block
      setPhotographersData((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "blocked", isActive: false } : p
        )
      );
    } catch (err) {
      console.error("Block error:", err);
      const errorMsg =
        err.response?.data?.message || "Failed to block photographer";
      alert(`Error: ${errorMsg}`);
    }
  };

  // Debug: Log the current state
  console.log("🔍 Current state:", {
    loading,
    error,
    dataLength: photographersData.length,
  });

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl mb-5 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">
            Photographer Management
          </h3>
        </div>
        <div className="p-12 text-center">
          {/* Enhanced loading animation */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">
                Loading photographers...
              </p>
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
          <h3 className="text-xl font-bold text-gray-900">
            Photographer Management
          </h3>
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
                onClick={fetchPhotographers}
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
        <h3 className="text-xl font-bold text-gray-900">
          Photographer Management
        </h3>
        <button
          onClick={fetchPhotographers}
          className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Show count */}
      {photographersData.length > 0 && (
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            {photographersData.length} photographer
            {photographersData.length !== 1 ? "s" : ""} found
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
                Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {photographersData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserX className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">
                        No photographers found
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        There are no photographers registered yet.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              photographersData.map((photographer) => (
                <tr
                  key={photographer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {photographer.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "?"}
                      </div>
                      <div className="text-sm text-gray-900 font-medium">
                        {photographer.name || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {photographer.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={photographer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {photographer.joined
                      ? new Date(photographer.joined).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {photographer.rating !== null &&
                    photographer.rating !== undefined ? (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>
                          {photographer.rating === 0
                            ? "New"
                            : photographer.rating}{" "}
                          - ₹{photographer.basePrice || 0}
                        </span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(photographer.id)}
                        className="text-gray-600 cursor-pointer hover:text-green-600 transition-colors p-1 rounded"
                        title="Approve photographer"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(photographer.id)}
                        className="text-gray-600 cursor-pointer hover:text-orange-600 transition-colors p-1 rounded"
                        title="Block photographer"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(photographer.id)}
                        className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors p-1 rounded"
                        title="Delete photographer"
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

export default PhotographerTable;
