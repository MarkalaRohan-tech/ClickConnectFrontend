import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Clock,
  Star,
  Camera,
  MapPin,
  Mail,
  Phone,
  Edit,
  Plus,
  ImageIcon,
} from "lucide-react";
import StatCard from "./components/StatCard";
import BookingRow from "./components/BookingRow";
import {
  PortfolioModal,
  ProfileEditModal,
  BookingModal,
} from "./components/Modals";
import { ToastContainer } from "react-toastify";
import Notification from "../../../Services/Notification";
import axios from "axios";

const PhotographerDashboard = () => {
  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    phone: "",
    location: "",
    genres: [],
    pricing: { baseRate: 0 },
    email: "",
    profilePic: "",
    rating: 0,
    ratingCount: 0,
    portfolio: [],
  });
  const [bookings, setBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [rating, setRating] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [showProfilePortfolioModal, setShowProfilePortfolioModal] =
  useState(false);
const [profilePic, setProfilePic] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingPortfolioIndex, setEditingPortfolioIndex] = useState(null);
  const [portfolioForm, setPortfolioForm] = useState([]);
  const [profileForm, setProfileForm] = useState({
    displayName: "",
    bio: "",
    phone: "",
    location: "",
    genres: [],
    pricing: { baseRate: 0 },
  });

  const [selectedBooking, setSelectedBooking] = useState(null);

  const openPortfolioModal = (index = null) => {
    setEditingPortfolioIndex(index);
    if (index !== null) {
      setPortfolioForm({
        url: portfolio[index].url,
        caption: portfolio[index].caption,
      });
    } else {
      setPortfolioForm({ url: "", caption: "" });
    }
    setShowPortfolioModal(true);
  };

  const handlePortfolioConfirm = () => {
    if (!portfolioForm.url || !portfolioForm.caption) return;
    if (editingPortfolioIndex !== null) {
      setPortfolio((prev) =>
        prev.map((item, idx) =>
          idx === editingPortfolioIndex ? { ...item, ...portfolioForm } : item
        )
      );
    } else {
      setPortfolio((prev) => [
        ...prev,
        { ...portfolioForm, _id: Date.now().toString() },
      ]);
    }
    setShowPortfolioModal(false);
    setEditingPortfolioIndex(null);
    setPortfolioForm({ url: "", caption: "" });
  };

  const addGenre = () => {
    const newGenre = prompt("Enter new genre:");
    if (newGenre && !profileForm.genres.includes(newGenre.toLowerCase())) {
      setProfileForm((prev) => ({
        ...prev,
        genres: [...prev.genres, newGenre.toLowerCase()],
      }));
    }
  };

  const removeGenre = (genreToRemove) => {
    setProfileForm((prev) => ({
      ...prev,
      genres: prev.genres.filter((genre) => genre !== genreToRemove),
    }));
  };
  
      const updateBookingStatus = async (id, status) => {
        try {
          const res = await axios.patch(
            `/api/bookings/${id}/status`,
            { status },
            { withCredentials: true }
          );
          res.status === 200
            ? Notification.success(res.data.message)
            : Notification.error(res.data.message);
        } catch (error) {
          Notification.error(error.response?.data?.message || error.message);
        }
  };
  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        `/api/profiles/${profile._id}`,
        profileForm,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setProfile(res.data); // update local profile
        Notification.success("Profile updated successfully");
        setShowProfileModal(false); // close correct modal
      } else {
        Notification.error(res.data.message);
      }
    } catch (error) {
      Notification.error(error.response?.data?.message || error.message);
    }
  };

const handleSaveProfilePortfolio = () => {
  if (!profilePic) return;

  axios
    .patch(`/api/profiles/${profile._id}/pictures`, {
      profilePic,
      portfolio,
    })
    .then((res) => {
      setProfile(res.data);
      Notification.success("Profile updated successfully");
      setShowProfilePortfolioModal(false);
    })
    .catch((err) => {
      Notification.error(err.response?.data?.message || err.message);
    });
};


    // Usage
    const onReject = (id) => updateBookingStatus(id, "rejected");
  const onApprove = (id) => updateBookingStatus(id, "approved");
  const onComplete = (id) => updateBookingStatus(id, "completed");
  const onSaveChanges = () => updateProfile();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user ID from localStorage - handle potential parsing errors
        let userId;
        try {
          const userData = localStorage.getItem("User");
          if (!userData) {
            throw new Error("No user data found in localStorage");
          }
          const parsedUser = JSON.parse(userData);
          userId = parsedUser.id || parsedUser._id;
          if (!userId) {
            throw new Error("No user ID found in stored data");
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          setError("Authentication error. Please log in again.");
          return;
        }

        const response = await axios.get(`/api/profiles/${userId}`, {
          withCredentials: true,
        });
        const data = response.data;

        // Set profile data
        if (data.photographer || data) {
          const photographerData = data.photographer || data;
          setProfile(photographerData);
          setPortfolio(photographerData.portfolio || []);

          // Initialize profile form with current data
          setProfileForm({
            displayName: photographerData.displayName || "",
            bio: photographerData.bio || "",
            phone: photographerData.phone || "",
            location: photographerData.location || "",
            genres: photographerData.genres || [],
            pricing: photographerData.pricing || { baseRate: 0 },
          });
        }

        // Set bookings data
        setBookings(data.bookings || []);
        console.log("Bookings data:", data.bookings);

        // Set statistics
        setPendingBookings(data.pendingBookings || 0);
        setCompletedBookings(data.completedBookings || 0);

        // Handle rating data - it might be in avgRating or reviews
        const avgRating = data.avgRating  || 0;
        setRating(typeof avgRating === "number" ? avgRating : 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(
          error.response?.data?.message || "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array - only run once on mount

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-xl">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Photographer Dashboard</h1>
          <p className="text-gray-400">
            Welcome back, {profile.displayName || "Photographer"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-black border border-white text-white rounded hover:bg-white hover:text-black transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
          <button
            onClick={() => setShowProfilePortfolioModal(true)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Update Profile & Portfolio
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Clock}
          color="text-orange-500"
          label="Pending Bookings"
          value={pendingBookings}
        />
        <StatCard
          icon={Calendar}
          color="text-green-500"
          label="Completed Bookings"
          value={completedBookings}
        />
        <StatCard
          icon={ImageIcon}
          color="text-blue-500"
          label="Total Bookings"
          value={bookings.length}
        />
        <StatCard
          icon={Star}
          color="text-yellow-500"
          label="Average Rating"
          value={rating ? rating.toFixed(1) : "N/A"}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="bg-white border border-black rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">Profile</h2>
            <User className="w-6 h-6 text-black" />
          </div>

          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white border border-black rounded-full mx-auto mb-4 overflow-hidden">
              {profile.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-black" />
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold text-black">
              {profile.displayName || "No name"}
            </h3>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-4 h-4 text-black fill-current" />
              <span className="text-black font-medium">
                {profile.rating ? profile.rating.toFixed(1) : "No ratings yet"}
              </span>
              {profile.ratingCount > 0 && (
                <span className="text-gray-600 text-sm">
                  ({profile.ratingCount} reviews)
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 text-sm text-black">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4" />
              <span>{profile.location || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>{profile.email || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" />
              <span>{profile.phone || "Not specified"}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm mb-2 block text-black font-medium">
              Bio
            </label>
            <p className="text-gray-700 text-sm line-clamp-3">
              {profile.bio || "No bio available"}
            </p>
          </div>

          <div className="mt-6">
            <label className="text-sm mb-2 block text-black font-medium">
              Specialties
            </label>
            <div className="flex flex-wrap gap-2">
              {profile.genres?.length > 0 ? (
                profile.genres.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-black text-white text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No specialties added
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="xl:col-span-3 bg-white border border-black rounded-lg">
          <div className="p-6 border-b border-black flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Recent Bookings</h2>
            <Calendar className="w-6 h-6 text-black" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-black">
                <tr>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Date
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Timeslot
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Title
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Price
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Status
                  </th>
                  <th className="py-4 px-4 text-left text-sm font-medium text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <BookingRow
                      key={booking._id || booking.id}
                      booking={booking}
                      onView={setSelectedBooking}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 px-4 text-center text-gray-500"
                    >
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PortfolioModal
        open={showProfilePortfolioModal}
        onClose={() => setShowProfilePortfolioModal(false)}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        onConfirm={handleSaveProfilePortfolio}
      />

      <ProfileEditModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profileForm={profileForm}
        setProfileForm={setProfileForm}
        onSaveChanges={onSaveChanges}
        addGenre={addGenre}
        removeGenre={removeGenre}
      />

      <BookingModal
        booking={selectedBooking}
        onConfirm={() => {
          onApprove(selectedBooking._id);
        }}
        onReject={() => {
          onReject(selectedBooking._id);
        }}
        onComplete={() => {
          onComplete(selectedBooking._id);
        }}
        onClose={() => setSelectedBooking(null)}
      />

      <ToastContainer position="top-center" />
    </div>
  );
};

export default PhotographerDashboard;
