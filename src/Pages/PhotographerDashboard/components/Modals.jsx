import React from 'react'
import { X, Edit, Plus } from 'lucide-react'

export const PortfolioModal = ({
  open,
  onClose,
  profilePic,
  setProfilePic,
  portfolio,
  setPortfolio,
  onConfirm,
}) => {
  if (!open) return null;

  const handlePortfolioChange = (index, value) => {
    setPortfolio((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addPortfolioInput = () => {
    setPortfolio((prev) => [...prev, ""]);
  };

  const removePortfolioInput = (index) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white rounded-lg max-w-lg w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            Update Profile & Portfolio
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-white text-sm mb-2">
              Profile Picture URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/profile.jpg"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
            />
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover border border-white"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          {/* Portfolio URLs */}
          <div>
            <label className="block text-white text-sm mb-2">
              Portfolio Image URLs
            </label>
            {portfolio.map((url, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => handlePortfolioChange(index, e.target.value)}
                  className="flex-1 p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
                />
                <button
                  onClick={() => removePortfolioInput(index)}
                  className="px-3 cursor-pointer py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addPortfolioInput}
              className="flex cursor-pointer items-center gap-2 mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add More
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 cursor-pointer py-2 bg-black border border-white text-white rounded hover:bg-white hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!profilePic}
              className="px-6 cursor-pointer py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileEditModal = ({
  open,
  onClose,
  profileForm,
  setProfileForm,
  addGenre,
  removeGenre,
  onSaveChanges,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Profile</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={profileForm.displayName}
              onChange={(e) =>
                setProfileForm((prev) => ({
                  ...prev,
                  displayName: e.target.value,
                }))
              }
              className="w-full p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Bio</label>
            <textarea
              value={profileForm.bio}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={3}
              className="w-full p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Phone</label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Location</label>
            <input
              type="text"
              value={profileForm.location}
              onChange={(e) =>
                setProfileForm((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="w-full p-3 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">Genres</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profileForm.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-black text-sm rounded-full flex items-center gap-2"
                >
                  {genre}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => removeGenre(genre)}
                  />
                </span>
              ))}
            </div>
            <button
              onClick={addGenre}
              className="px-4 cursor-pointer py-2 border border-white text-white rounded hover:bg-white hover:text-black transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Genre
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Pricing Packages</h4>
            {Object.entries(profileForm.pricing.packages).map(([key, pkg]) => (
              <div key={key} className="border border-white rounded p-4">
                <h5 className="text-white font-medium mb-2 capitalize">
                  {key} Package
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            packages: {
                              ...prev.pricing.packages,
                              [key]: {
                                ...pkg,
                                price: parseInt(e.target.value),
                              },
                            },
                          },
                        }))
                      }
                      className="w-full p-2 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={pkg.duration}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            packages: {
                              ...prev.pricing.packages,
                              [key]: { ...pkg, duration: e.target.value },
                            },
                          },
                        }))
                      }
                      className="w-full p-2 bg-black border border-white text-white rounded focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 cursor-pointer bg-black border border-white text-white rounded hover:bg-white hover:text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSaveChanges}
              className="px-6 py-2 cursor-pointer bg-white text-black rounded hover:bg-gray-200 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const BookingModal = ({ booking, onClose, onConfirm, onReject,onComplete }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Booking Details</h3>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-3 text-white">
          <p>
            <span className="font-medium">ClientId:</span>{" "}{booking.user}
          </p>
          <p>
            <span className="font-medium">Date:</span>
            {new Date(booking.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>
            <span className="font-medium">Time:</span> {booking.timeSlot}
          </p>
          <p>
            <span className="font-medium">Title:</span> {booking.title}
          </p>
          <p>
            <span className="font-medium">Price:</span> {booking.package}
          </p>
          <p>
            <span className="font-medium">Status:</span> &nbsp;
            <span
              className={`px-2 py-1 rounded text-sm ${
                booking.status === "completed"
                  ? "bg-purple-100 text-purple-600 border border-purple-600 rounded-2xl"
                  : booking.status === "approved"
                  ? "bg-green-100 text-green-600 border border-green-600 rounded-2xl"
                  : booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-600  border border-yellow-600 rounded-2xl"
                  : booking.status === "rejected"
                  ? "bg-red-100 text-red-600  border border-red-600 rounded-2xl"
                  : "bg-gray-100 text-black border border-black"
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          {booking.status === "pending" && (
            <>
              <button
                onClick={onReject}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </>
                  )}
                  {
                    booking.status === "approved" && (
                        <button
                            onClick={onComplete}
                            className="px-4 py-2 cursor-pointer bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
                        >
                            Completed
                        </button>
                    )
                  }
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



