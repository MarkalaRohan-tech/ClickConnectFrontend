import React, { useState } from "react";
import { X, Plus, Upload, Trash2, Loader } from "lucide-react";

export const PortfolioModal = ({
  open,
  onClose,
  profilePic,
  setProfilePic,
  portfolio,
  setPortfolio,
  onConfirm,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  if (!open) return null;

  // Cloudinary upload configuration
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "portfolio"); // Optional: organize uploads in folders

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingProfile(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setProfilePic(imageUrl);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingProfile(false);
    }
  };

  const handlePortfolioImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      setUploadingIndex(index);
      const imageUrl = await uploadImageToCloudinary(file);
      handlePortfolioChange(index, imageUrl);
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handlePortfolioChange = (index, value) => {
    setPortfolio((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addPortfolioInput = () => {
    if (portfolio.length >= 4) {
      alert("Maximum 4 portfolio images allowed");
      return;
    }
    setPortfolio((prev) => [...prev, ""]);
  };

  const removePortfolioInput = (index) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const removeProfilePic = () => {
    setProfilePic("");
  };

  // Check if save button should be enabled
  const canSave = profilePic || portfolio.some((url) => url.trim() !== "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            Update Profile & Portfolio
          </h3>
          <button
            onClick={onClose}
            className="text-white cursor-pointer hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-white text-sm mb-2">
              Profile Picture
            </label>

            {/* Current profile picture */}
            {profilePic && (
              <div className="relative mb-3 inline-block">
                <img
                  src={profilePic}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border border-white"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <button
                  onClick={removeProfilePic}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Upload button */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                className="hidden"
                id="profile-pic-upload"
                disabled={uploadingProfile}
              />
              <label
                htmlFor="profile-pic-upload"
                className={`items-center gap-2 px-4 py-2 bg-white text-black rounded cursor-pointer hover:bg-gray-200 transition-colors inline-flex ${
                  uploadingProfile ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploadingProfile ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploadingProfile ? "Uploading..." : "Upload Profile Picture"}
              </label>
            </div>
          </div>

          {/* Portfolio Images */}
          <div>
            <label className="block text-white text-sm mb-2">
              Portfolio Images (Maximum 4 images)
            </label>
            <div className="text-gray-400 text-xs mb-3">
              Current: {portfolio.filter((url) => url.trim() !== "").length}/4
              images
            </div>

            {portfolio.map((url, index) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-600 rounded"
              >
                {/* Show uploaded image */}
                {url && (
                  <div className="mb-3">
                    <img
                      src={url}
                      alt={`Portfolio ${index + 1}`}
                      className="w-32 h-32 object-cover rounded border border-white"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Upload button for this portfolio item */}
                  <div className="relative flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePortfolioImageUpload(e, index)}
                      className="hidden"
                      id={`portfolio-upload-${index}`}
                      disabled={uploadingIndex === index}
                    />
                    <label
                      htmlFor={`portfolio-upload-${index}`}
                      className={` items-center gap-2 px-3 py-2 bg-white text-black rounded cursor-pointer hover:bg-gray-200 transition-colors inline-flex ${
                        uploadingIndex === index
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {uploadingIndex === index ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      {uploadingIndex === index
                        ? "Uploading..."
                        : url
                        ? "Replace Image"
                        : "Upload Image"}
                    </label>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removePortfolioInput(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Add more portfolio items */}
            <button
              onClick={addPortfolioInput}
              disabled={portfolio.length >= 4}
              className="flex cursor-pointer items-center gap-2 mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
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
              disabled={
                !canSave ||
                uploading ||
                uploadingProfile ||
                uploadingIndex !== null
              }
              className="px-6 cursor-pointer py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading || uploadingProfile || uploadingIndex !== null
                ? "Processing..."
                : "Save"}
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

export const BookingModal = ({
  booking,
  onClose,
  onConfirm,
  onReject,
  onComplete,
}) => {
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
            <span className="font-medium">ClientId:</span> {booking.user}
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
          {booking.status === "approved" && (
            <button
              onClick={onComplete}
              className="px-4 py-2 cursor-pointer bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors"
            >
              Completed
            </button>
          )}
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
