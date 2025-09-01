import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      className="w-full h-[100dvh] bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/photo.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      animate={{ backgroundSize: ["100%", "110%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative flex flex-col items-center md:items-start justify-center h-full px-4 sm:px-6 md:px-12 lg:px-20 gap-6 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex justify-center md:justify-start w-full mb-4">
          <motion.img
            src="/Icon1.png"
            alt="Logo"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full border-2 border-white shadow-lg shadow-amber-50 hover:scale-105 transition-transform duration-300"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Title */}
        <h1 className="text-white font-semibold dancing-script leading-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
          Find the best Photographers & Videographers
        </h1>

        {/* Description */}
        <p className="poppins-regular text-gray-200 mt-4 max-w-lg sm:max-w-xl md:max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
          Connect with talented Photographers and Videographers for your events,
          weddings, portraits, projects and more. Let the best capture your
          lifetime precious moments. Browse portfolios, compare prices and book
          instantly.
        </p>

        {/* Call-to-Action */}
        <div className="mt-6">
          <button className="bg-white text-black hover:bg-gray-200 px-5 sm:px-7 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105">
            Start Exploring
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
