import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";

// SlidingToggle Component
const SlidingToggle = ({ options, selected, onChange, className = "" }) => {
  const selectedIndex = options.indexOf(selected);
  const optionCount = options.length;

  // Calculate width percentage based on number of options
  const getSliderWidth = () => {
    return `calc(${100 / optionCount}% - 4px)`;
  };

  // Calculate transform position based on selected index
  const getSliderTransform = () => {
    const movePercentage = selectedIndex * (100 / optionCount) * optionCount;
    return `translateX(${movePercentage}%)`;
  };

  return (
    <div
      className={`relative bg-gray-100 rounded-full p-1 flex mb-6 ${className}`}
    >
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            relative z-10 flex-1 py-2 px-2 text-sm font-medium 
            transition-all duration-300 rounded-full text-center
            ${
              selected === option
                ? "text-white"
                : "text-gray-600 hover:text-gray-800"
            }
          `}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}

      {/* Sliding Background */}
      <div
        className="absolute top-1 bottom-1 bg-black rounded-full transition-transform duration-300 ease-in-out z-0"
        style={{
          width: getSliderWidth(),
          transform: getSliderTransform(),
          left: "2px",
        }}
      />
    </div>
  );
};

const VerificationForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    role :role
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }));
  }, [role]);

  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpAndPassword = () => {
    const newErrors = {};
    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  // Step 1: Send OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsSubmitting(true);

    try {
      const requiredData = { email: formData.email, userType: role };
      const res = await axios.post("/api/password-reset/forgot", requiredData);

      console.log(res.data.message);
      Notification.success("OTP sent successfully!");
      setIsOtpSent(true); // ✅ Add this
    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error.response?.status === 400 || error.response?.status === 500) {
        Notification.error("Failed to send OTP. Please try again.");
        setTimeout(() => navigate("/forgot-password"), 2000);
      } else {
        Notification.error("Unexpected error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateOtpAndPassword()) return;

    setIsSubmitting(true);

    try {
      const requiredData = {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
        userType: role,
      };

      const res = await axios.post("/api/password-reset/reset", requiredData);

      if (res.data.error) {
        Notification.error(res.data.error);
      } else {
        Notification.success(res.data.message);
        setIsVerified(true); // mark as verified only on success
        setTimeout(() => navigate("/login"), 2000); // navigate after 2 seconds
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      Notification.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false); // always reset submitting state
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const roles = ["user", "photographer", "admin"];

  const inputClass = `
    w-full p-4 border-2 border-gray-200 rounded-lg 
    transition-all duration-300 ease-in-out
    focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none
    hover:border-gray-400 hover:shadow-sm
    placeholder-gray-400
    text-black
    transform hover:scale-[1.02] focus:scale-[1.02]
  `;

  const labelClass = `
    block text-sm font-semibold text-gray-700 mb-2
    transition-colors duration-200
  `;

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center transform hover:shadow-3xl transition-all duration-500"
            style={{
              animation: "slideUp 0.8s ease-out",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Success Icon */}
            <div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 opacity-0"
              style={{ animation: "fadeInScale 1s ease-out 0.3s both" }}
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
            </div>

            {/* Success Message */}
            <h1
              className="text-3xl font-bold text-black mb-4 opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.5s both" }}
            >
              Password Reset Successful
            </h1>

            <p
              className="text-gray-600 text-lg mb-2 opacity-0"
              style={{ animation: "fadeInUp 1s ease-out 0.7s both" }}
            >
              You can now login with your new password.
            </p>

            <p
              className="text-black font-semibold text-lg mb-8 opacity-0"
              style={{ animation: "fadeInUp 1s ease-out 0.9s both" }}
            >
              {formData.email}
            </p>

            {/* Back to Login Button */}
            <button
              onClick={handleBackToLogin}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-black text-white hover:bg-gray-800 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] opacity-0"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #1f1f1f 100%)",
                animation: "fadeInUp 1s ease-out 1.3s both",
              }}
            >
              Back to Login
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Main Verification Container */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 transform hover:shadow-3xl transition-all duration-500"
          style={{
            animation: "slideUp 0.8s ease-out",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            {/* Lock Icon */}
            <div
              className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 opacity-0"
              style={{ animation: "fadeInScale 1s ease-out 0.2s both" }}
            >
              <span className="text-2xl">🔒</span>
            </div>

            <h1
              className="text-4xl font-bold text-black mb-2 tracking-tight opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.4s both" }}
            >
              Reset Password
            </h1>
            <p
              className="text-gray-600 text-lg opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.6s both" }}
            >
              {isOtpSent
                ? "Enter the OTP and your new password"
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          {/* Role Toggle */}
          <div
            className="opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 0.8s both" }}
          >
            <SlidingToggle options={roles} selected={role} onChange={setRole} />
          </div>

          {/* Form */}
          <div
            className="space-y-6 opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 1s both" }}
          >
            {/* Email Field */}
            {!isOtpSent && (
              <div className="transform hover:scale-[1.02] transition-transform duration-200">
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
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
            )}

            {/* OTP, Password, Confirm Password Fields */}
            {isOtpSent && (
              <>
                <div className="transform hover:scale-[1.02] transition-transform duration-200">
                  <label className={labelClass}>OTP</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className={inputClass}
                    value={formData.otp}
                    onChange={(e) => handleInputChange("otp", e.target.value)}
                  />
                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-2 animate-pulse">
                      {errors.otp}
                    </p>
                  )}
                </div>
                <div className="transform hover:scale-[1.02] transition-transform duration-200">
                  <label className={labelClass}>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
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
                <div className="transform hover:scale-[1.02] transition-transform duration-200">
                  <label className={labelClass}>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className={inputClass}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2 animate-pulse">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Verify/Reset Button */}
            <div className="pt-4">
              {!isOtpSent ? (
                <button
                  onClick={handleVerify}
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 rounded-xl font-semibold text-lg
                    transition-all duration-300 ease-in-out
                    transform hover:scale-[1.02] active:scale-[0.98]
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800 hover:shadow-lg cursor-pointer"
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
                    {isSubmitting ? "Sending OTP..." : "Send OTP"}
                  </span>
                  {isSubmitting && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleResetPassword}
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 rounded-xl font-semibold text-lg
                    transition-all duration-300 ease-in-out
                    transform hover:scale-[1.02] active:scale-[0.98]
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800 hover:shadow-lg cursor-pointer"
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
                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                  </span>
                  {isSubmitting && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              )}
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 font-medium">
                Remember your password?{" "}
                <NavLink
                  to="/login"
                  className="text-black font-semibold underline hover:text-gray-700 transition-colors duration-200 transform hover:scale-105 inline-block"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </NavLink>
              </p>
            </div>
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

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default VerificationForm;
