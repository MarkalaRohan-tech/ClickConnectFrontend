import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import SlidingToggle from "../../components/SlidingToggle";
import api from "../../api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../../Services/Notification";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const roles = ["user", "photographer"];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role:role,
    name: "",
    email: "",
    password: "",
    phone: "",
    displayName: "",
    baseRate: "",
    bio: "",
    location: "",
    genres: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.name.trim()) newErrors.name = "Full Name is required";

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include uppercase, lowercase, and a number";
    }

    // Phone for user
    if (role === "user") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\d{10,15}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid phone number (10-15 digits)";
      }
    }

    // Photographer-specific validations
    if (role === "photographer") {
      if (!formData.displayName.trim())
        newErrors.displayName = "Display name is required";

      if (!formData.baseRate.trim()) {
        newErrors.baseRate = "Base rate is required";
      } else if (isNaN(formData.baseRate) || Number(formData.baseRate) <= 0) {
        newErrors.baseRate = "Base rate must be a positive number";
      }

      if (!formData.bio.trim()) newErrors.bio = "Bio is required";

      if (!formData.location.trim()) newErrors.location = "Location is required";

      if (!formData.genres.trim()) newErrors.genres = "Genres are required";

      if (formData.additionalInfo && formData.additionalInfo.length > 500) {
        newErrors.additionalInfo = "Additional info should be less than 500 chars";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (role === "user") {
      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: role,
        };
      console.log("User Registration:", userData);
      const res = await api.post("/api/auth/register", userData);
        localStorage.setItem("User", JSON.stringify(res.data));
        Notification.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Registration error:", error);
        const message =
          error.response?.data?.message || "Registration failed. Try again.";
        Notification.error(message);
      }
    } else {
      console.log("Photographer Registration:", formData);
      try {
        const res = await api.post("/api/photographer/auth/register", formData);
        Notification.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Registration error:", error);
        const message =
          error.response?.data?.message || "Registration failed. Try again.";
        Notification.error(message);
      }
    }
    setIsSubmitting(false);
  };

  const inputClass = `
    w-full p-4 border-2 border-gray-200 rounded-lg 
    transition-all duration-300 ease-in-out
    text-black
    focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none
    hover:border-gray-400 hover:shadow-sm
    placeholder-gray-400
    transform hover:scale-[1.02] focus:scale-[1.02]
  `;

  const labelClass = `
    block text-sm font-semibold text-gray-700 mb-2
    transition-colors duration-200
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Form Container */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:shadow-3xl transition-all duration-500 animate-pulse"
          style={{
            animation: "slideUp 0.8s ease-out",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-black mb-2 tracking-tight opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.3s both" }}
            >
              Create Account
            </h1>
            <p
              className="text-gray-600 text-lg opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.5s both" }}
            >
              Join Us
            </p>
          </div>

          {/* Role Toggle */}
          <div
            className="opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 0.7s both" }}
          >
            <SlidingToggle
              options={roles}
              selected={role}
              onChange={(newRole) => {
                setRole(newRole); 
                setFormData((prev) => ({ ...prev, role: newRole })); 
              }}
            />

          </div>

          {/* Form */}
          <div
            className="space-y-6 opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 0.9s both" }}
          >
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={inputClass}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 animate-pulse">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 animate-pulse">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className={inputClass}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 animate-pulse">
                    {errors.password}
                  </p>
                )}
              </div>
                <div
                  key="user-phone"
                  className="transform hover:scale-[1.02] transition-transform duration-200 opacity-0"
                  style={{ animation: "slideInRight 0.5s ease-out both" }}
                >
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className={inputClass}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 animate-pulse">
                      {errors.phone}
                    </p>
                  )}
                </div>
            </div>

            {/* Photographer specific fields */}
            {role === "photographer" && (
              <div
                key="photographer-fields"
                className="space-y-6 opacity-0"
                style={{ animation: "slideInRight 0.5s ease-out both" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={labelClass}>Studio/Display Name</label>
                    <input
                      type="text"
                      placeholder="Your studio or professional name"
                      className={inputClass}
                      value={formData.displayName}
                      onChange={(e) =>
                        handleInputChange("displayName", e.target.value)
                      }
                    />
                    {errors.displayName && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.displayName}
                      </p>
                    )}
                  </div>

                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={labelClass}>Base Rate (₹)</label>
                    <input
                      type="number"
                      placeholder="5000"
                      className={inputClass}
                      value={formData.baseRate}
                      onChange={(e) =>
                        handleInputChange("baseRate", e.target.value)
                      }
                    />
                    {errors.baseRate && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.baseRate}
                      </p>
                    )}
                  </div>
                </div>

                <div className="transform hover:scale-[1.02] transition-transform duration-200">
                  <label className={labelClass}>Professional Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your photography experience and style..."
                    className={`${inputClass} resize-none`}
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-2 animate-pulse">
                      {errors.bio}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={labelClass}>Location</label>
                    <input
                      type="text"
                      placeholder="Hyderabad, Telangana"
                      className={inputClass}
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <label className={labelClass}>Photography Genres</label>
                    <input
                      type="text"
                      placeholder="wedding, portrait, event"
                      className={inputClass}
                      value={formData.genres}
                      onChange={(e) =>
                        handleInputChange("genres", e.target.value)
                      }
                    />
                    {errors.genres && (
                      <p className="text-red-500 text-sm mt-2 animate-pulse">
                        {errors.genres}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  cursor-pointer
                  w-full py-4 rounded-xl font-semibold text-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-[1.02] active:scale-[0.98]
                  ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 hover:shadow-lg"
                  }
                  text-white shadow-md
                  relative overflow-hidden
                `}
                style={{
                  background: isSubmitting
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #000000 0%, #1f1f1f 100%)",
                }}
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
                <span className="relative z-10">
                  {isSubmitting
                    ? "Creating Account..."
                    : `Register as ${
                        role.charAt(0).toUpperCase() + role.slice(1)
                      }`}
                </span>
                {isSubmitting && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-center font-semibold text-gray-600">
              Already have an account? &nbsp;
              <NavLink to="/login" className="text-black underline">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
};

export default Register;
