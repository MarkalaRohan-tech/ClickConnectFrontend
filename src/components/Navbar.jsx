import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, loading, user } = useContext(AuthContext);

  // Debug log to see what user object contains
  console.log("🔍 Navbar - user object:", user);
  console.log("🔍 Navbar - user.role:", user?.role);
  console.log("🔍 Navbar - user.type:", user?.type);

  if (loading) return null; // optional: show a spinner

  return (
    <div className="navbar bg-base-100 shadow-sm dark:bg-black dark:text-white flex justify-between px-10">
      <NavLink className="flex items-center gap-2 hover:scale-105 transition-transform" to="/">
        <img
          src="/Icon1.png"
          alt="ClickConnect"
          className="w-10 h-10 rounded-full"
        />
        <div className="text-3xl dancing-script">ClickConnect</div>
      </NavLink>

      <ul className="menu menu-horizontal px-1 flex items-center gap-4 text-gray-400">
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

      <div>
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
    </div>
  );
};

export default Navbar;
