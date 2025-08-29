import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const elements = [];
    for (let i = 0; i < 6; i++) {
      elements.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 4,
        size: Math.random() * 20 + 10,
      });
    }
    setFloatingElements(elements);
  }, []);

  const handleGoHome = () => {
    console.log("Navigate to home page");
  };

  const handleGoBack = () => {
    console.log("Go back to previous page");
    window.history.back();
  };

  const handleContactSupport = () => {
    console.log("Contact support");
  };

  const quickLinks = [
    { name: "Home", action: handleGoHome },
    { name: "Login", action: () => console.log("Navigate to login") },
    { name: "Register", action: () => console.log("Navigate to register") },
    { name: "Gallery", action: () => console.log("Navigate to gallery") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-20 bg-white rounded-full animate-pulse"
          style={{
            left: `${element.left}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            animationDelay: `${element.animationDelay}s`,
            animation: `float ${6 + element.id}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="w-full max-w-4xl text-center relative z-10">
        {/* Main 404 Container */}
        <div
          className={`bg-white rounded-3xl shadow-2xl p-8 md:p-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Large 404 Text */}
          <div className="mb-8">
            <h1
              className="text-8xl md:text-9xl font-black text-black mb-4 opacity-0"
              style={{
                animation: "bounceIn 1.2s ease-out 0.3s both",
                textShadow: "0 10px 20px rgba(0,0,0,0.1)",
              }}
            >
              404
            </h1>

            {/* Animated Underline */}
            <div
              className="h-2 bg-black rounded-full mx-auto opacity-0"
              style={{
                width: "120px",
                animation: "slideInFromLeft 1s ease-out 0.8s both",
              }}
            />
          </div>

          {/* Error Messages */}
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-black mb-4 opacity-0"
              style={{ animation: "fadeInUp 1s ease-out 1s both" }}
            >
              Oops! Page Not Found
            </h2>

            <p
              className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto opacity-0"
              style={{ animation: "fadeInUp 1s ease-out 1.2s both" }}
            >
              The page you're looking for seems to have vanished into thin air.
              Don't worry, even the best photographers sometimes miss their
              shot!
            </p>

            <div
              className="flex items-center justify-center space-x-2 text-gray-500 opacity-0"
              style={{ animation: "fadeInUp 1s ease-out 1.4s both" }}
            >
              <span className="text-2xl">📸</span>
              <span className="text-sm font-medium">
                Let's get you back on track
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0"
            style={{ animation: "fadeInUp 1s ease-out 1.6s both" }}
          >
            <NavLink
              to="/"
              className="px-8 py-4 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #1f1f1f 100%)",
              }}
            >
              <i className="fas fa-home"></i> &nbsp; Go Home
            </NavLink>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
            width: 0;
          }
          to {
            opacity: 1;
            transform: translateX(0);
            width: 120px;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -20px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
            transform: translate3d(0, -10px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
