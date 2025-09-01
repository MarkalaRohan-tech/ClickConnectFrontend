import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, loading, user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  if (loading) return null; // optional: show a spinner

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm dark:bg-black dark:text-white flex justify-between px-4 md:px-10">
        <NavLink
          className="flex items-center gap-2 hover:scale-105 transition-transform"
          to="/"
        >
          <img
            src="/Icon1.png"
            alt="ClickConnect"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-3xl dancing-script">ClickConnect</div>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="menu menu-horizontal px-1 hidden md:flex items-center gap-4 text-gray-400">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }
            >
              Browse
            </NavLink>
          </li>

          {/* Changed from user?.type to user?.role */}
          {isAuthenticated && user?.role === "user" && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {/* Changed from user?.type to user?.role */}
          {isAuthenticated && user?.role === "photographer" && (
            <li>
              <NavLink
                to="/photographer"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }
              >
                Photographer
              </NavLink>
            </li>
          )}

          {/* Changed from user?.type to user?.role */}
          {isAuthenticated && user?.role === "admin" && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }
              >
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="btn btn-outline bg-white text-black"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <NavLink
                to="/login"
                className="btn btn-outline bg-white text-black"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-outline btn-black hover:bg-white hover:text-black"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-circle text-white hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-base-100 dark:bg-black shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <img
                src="/Icon1.png"
                alt="ClickConnect"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-xl dancing-script text-white">
                ClickConnect
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="btn btn-ghost btn-circle btn-sm text-white hover:bg-gray-700"
              aria-label="Close menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-black font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/browse"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-black font-semibold"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`
                  }
                >
                  Browse
                </NavLink>
              </li>

              {/* Role-based Navigation */}
              {isAuthenticated && user?.role === "user" && (
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}

              {isAuthenticated && user?.role === "photographer" && (
                <li>
                  <NavLink
                    to="/photographer"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`
                    }
                  >
                    Photographer
                  </NavLink>
                </li>
              )}

              {isAuthenticated && user?.role === "admin" && (
                <li>
                  <NavLink
                    to="/admin"
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="p-4 border-t border-gray-700">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  closeSidebar();
                }}
                className="w-full btn btn-outline flex justify-center items-center bg-white text-black hover:bg-gray-200"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-3">
                <NavLink
                  to="/login"
                  onClick={closeSidebar}
                  className="w-full btn btn-outline flex justify-center items-center bg-white text-black hover:bg-gray-200 block text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeSidebar}
                  className="w-full btn btn-outline btn-black flex justify-center items-center hover:bg-white hover:text-black block text-center"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
