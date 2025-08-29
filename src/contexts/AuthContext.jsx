import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Notification from "../../Services/Notification";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = [
    "/",
    "/browse",
    "/login",
    "/register",
    "/forgot-password",
  ];

  const getStoredUser = () => {
    try {
      const item = localStorage.getItem("User");
      return item ? JSON.parse(item) : null;
    } catch (err) {
      localStorage.removeItem("User");
      return null;
    }
  };

  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  const getToken = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const clearToken = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  const login = (token, userData) => {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    const loginTime = Date.now();
    const userWithTime = { ...userData, loginTime };
    setUser(userWithTime);
    localStorage.setItem("User", JSON.stringify(userWithTime));
  };

  const logout = () => {
    clearToken();
    setUser(null);
    localStorage.removeItem("User");

    if (!publicRoutes.includes(location.pathname)) {
      Notification.success("Logout successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const checkAuth = () => {
    const stored = getStoredUser();
    if (stored) {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in ms

      if (stored.loginTime && now - stored.loginTime > oneHour) {
        logout();
      } else {
        setUser(stored);
      }
    } else if (!publicRoutes.includes(location.pathname)) {
      logout();
    }
    setLoading(false);
    setInitialized(true);
  };

  const checkToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        logout();
      } else {
        const stored = getStoredUser();
        if (stored) setUser(stored);
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [initialized]);

  useEffect(() => {
    if (initialized && !user && !publicRoutes.includes(location.pathname)) {
      Notification.success("Logout successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [location.pathname, user, initialized]);

  // Check token periodically & clear expired localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      if (token) checkToken(token);

      const stored = getStoredUser();
      if (stored) {
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        if (stored.loginTime && now - stored.loginTime > oneHour) {
          logout();
        }
      }
    }, 60 * 1000); // check every 1 min

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
