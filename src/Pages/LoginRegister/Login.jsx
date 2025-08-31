import React, { useState,useEffect,useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import SlidingToggle from "../../components/SlidingToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../../../Services/Notification";
import api from "../../api";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const roles = ["user", "photographer", "admin"];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: role,
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  <SlidingToggle options={roles} selected={role} onChange={setRole} />;

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include uppercase, lowercase, and a number";
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


  
const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (role === "user") {
      try {
        const res = await api.post("/api/auth/login", formData, {
          withCredentials: true,
        });

        if (res.data.message === "Login successful") {
          console.log(res.data);

          // Add role to user data
          const userWithRole = {
            ...res.data.user,
            role: "user", // Ensure role is included
          };

          // Use consistent localStorage key
          localStorage.setItem("User", JSON.stringify(userWithRole));

          login(res.data.token, userWithRole);
          Notification.success("Login successful!");
          setTimeout(() => {
            navigate("/browse");
          }, 2000);
        } else {
          Notification.error(res.data.message || "Invalid Email or Password");
        }
      } catch (error) {
        Notification.error(`Login failed! ${error.message}`);
      }
    } else if (role === "photographer") {
      try {
        const res = await api.post("/api/photographer/auth/login", formData, {
          withCredentials: true,
        });

        if (res.data.message === "Login successful") {
          // Add role to photographer data
          const photographerWithRole = {
            ...res.data.photographer,
            role: "photographer", // Ensure role is included
          };

          // Use consistent localStorage key "User" instead of "Photographer"
          localStorage.setItem("User", JSON.stringify(photographerWithRole));

          login(res.data.token, photographerWithRole);
          Notification.success("Login successful!");
          setTimeout(() => {
            navigate("/photographer");
          }, 2000);
        } else {
          Notification.error(res.data.message || "Invalid Email or Password");
        }
      } catch (error) {
        Notification.error(`Login failed! ${error.message}`);
      }
    } else if (role === "admin") {
      try {
        console.log("Admin Login Attempt:", formData);

        const res = await api.post("/api/admin/auth/login", formData, {
          withCredentials: true,
        });

        if (res.data.message === "Login successful") {
          // Add role to admin data
          const adminWithRole = {
            ...res.data.admin,
            role: "admin", // Ensure role is included
          };

          // Use consistent localStorage key "User" instead of "Admin"
          localStorage.setItem("User", JSON.stringify(adminWithRole));

          login(res.data.token, adminWithRole);
          Notification.success("Login successful!");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          Notification.error(res.data.message || "Invalid Email or Password");
        }
      } catch (error) {
        console.error("Admin login error:", error);
        Notification.error(
          `Login failed! ${error.response?.data?.message || error.message}`
        );
      }
    }

    console.log(`${role} Login Data:`, formData);
    setIsSubmitting(false);
  };

  const inputClass = `
    w-full p-4 border-2 border-gray-200 rounded-lg 
    transition-all duration-300 ease-in-out
    focus:border-black focus:ring-2 focus:ring-black/10 focus:outline-none
    hover:border-gray-400 hover:shadow-sm
    text-black
    placeholder-gray-400
    transform hover:scale-[1.02] focus:scale-[1.02]
  `;

  const labelClass = `
    block text-sm font-semibold text-gray-700 mb-2
    transition-colors duration-200
  `;

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }));
  }, [role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Container */}
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
            <h1
              className="text-4xl font-bold text-black mb-2 tracking-tight opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.3s both" }}
            >
              Welcome Back
            </h1>
            <p
              className="text-gray-600 text-lg opacity-0"
              style={{ animation: "fadeInDown 1s ease-out 0.5s both" }}
            >
              Sign in to your account
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
              onChange={(newRole) => setRole(newRole)}
            />
          </div>

          {/* Form */}
          <div
            className="space-y-6 opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 0.9s both" }}
          >
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="relative transform hover:scale-[1.02] transition-transform duration-200">
              <label className={labelClass}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`${inputClass} pr-20`} // Add right padding so button doesn't overlap text
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2  text-sm font-semibold text-gray-800 hover:cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 animate-pulse">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex gap-2 text-black">
              <p>Forgot Password?</p>
              <NavLink
                to="/forgot-password"
                className="text-black font-semibold underline hover:text-gray-700 transition-colors duration-200 transform hover:scale-105 inline-block"
              >
                Reset it here
              </NavLink>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
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
                  {isSubmitting ? "Signing In..." : "Login"}
                </span>
                {isSubmitting && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 font-medium">
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-black font-semibold underline hover:text-gray-700 transition-colors duration-200 transform hover:scale-105 inline-block"
                >
                  Register
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
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
