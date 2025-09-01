import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Hero from "./Hero";
import FeatureBlock from "../../components/FeatureBlock";
import { AuthContext } from "../../contexts/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);

  return (
    <div className="overflow-x-hidden">
      <Hero />

      {/* Features Section */}
      <motion.h1
        className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold dancing-script m-4 md:m-6 lg:m-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-4"
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Features
      </motion.h1>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[90%] xl:w-[80%] flex flex-col justify-center items-center m-auto">
        <FeatureBlock
          align="left"
          title="Browse Portfolios"
          iconClass="fa-solid fa-address-card"
        >
          Users can explore detailed profiles of photographers and
          videographers. Each portfolio includes sample images/videos, a
          professional bio, areas of expertise (e.g., weddings, events, product
          shoots), and transparent pricing information. This helps users make
          informed choices before booking.
        </FeatureBlock>

        <FeatureBlock
          align="right"
          title="Easy Booking"
          iconClass="fa-solid fa-ticket"
        >
          With just a few clicks, users can select a preferred date, time, and
          professional to send a booking request. The system ensures a smooth
          booking flow, reducing the hassle of back-and-forth communication.
        </FeatureBlock>

        <FeatureBlock
          align="left"
          title="Secure Login & Roles"
          iconClass="fa-solid fa-shield-halved"
        >
          The platform supports role-based authentication for users,
          photographers/videographers, and admins. This ensures that each type
          of user has access only to the features they need, enhancing both
          security and usability.
        </FeatureBlock>

        <FeatureBlock
          align="right"
          title="Profile Approval"
          iconClass="fa-solid fa-thumbs-up"
        >
          To maintain quality and trust, every photographer and videographer
          profile is first reviewed by an admin. This verification step ensures
          that only genuine and professional individuals are listed on the
          platform.
        </FeatureBlock>

        <FeatureBlock
          align="left"
          title="Ratings & Reviews"
          iconClass="fa-solid fa-star"
        >
          After a completed booking, users can rate and review their experience.
          Reviews help future customers make better decisions and encourage
          professionals to maintain high-quality service standards.
        </FeatureBlock>

        <FeatureBlock
          align="right"
          title="Booking Management"
          iconClass="fa-solid fa-calendar-days"
        >
          Both users and professionals can manage their bookings efficiently.
          Status updates such as pending, approved, or rejected keep everyone
          informed. This avoids confusion and ensures transparent communication.
        </FeatureBlock>

        <FeatureBlock
          align="left"
          title="Photographer Dashboard"
          iconClass="fa-solid fa-chart-line"
        >
          Photographers and videographers get access to a personal dashboard
          where they can upload and update portfolio items (photos, videos),
          manage their availability calendar, accept or decline bookings, and
          track client feedback and ratings.
        </FeatureBlock>

        <FeatureBlock
          align="right"
          title="Admin Panel"
          iconClass="fa-solid fa-table-columns"
        >
          Admins have full control over the platform. They can approve or reject
          professional profiles, oversee and manage all bookings, moderate user
          reviews if necessary, and maintain overall system quality and trust.
        </FeatureBlock>

        <FeatureBlock
          align="left"
          title="Search & Filters"
          iconClass="fa-solid fa-magnifying-glass"
        >
          Users can quickly find the right professional using filters such as
          location, price range, event type, or rating. This makes discovery
          simple and ensures users connect with the most suitable
          photographers/videographers.
        </FeatureBlock>

        <FeatureBlock
          align="right"
          title="Responsive Design"
          iconClass="fa-solid fa-crop-simple"
        >
          The platform is fully optimized for desktop, tablet, and mobile
          devices. Whether users are browsing portfolios on a large screen or
          booking on the go via mobile, the experience remains smooth and
          intuitive.
        </FeatureBlock>
      </div>

      {/* Call to Action Section */}
      <div className="mt-8 md:mt-12 lg:mt-16 text-center px-4">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl dancing-script text-white font-bold m-4 md:m-6 lg:m-8 leading-tight"
          initial={{ opacity: 0.1, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Explore more with us...
        </motion.h1>

        {!loading && (
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mt-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="btn btn-outline bg-white text-black hover:bg-gray-200 hover:border-gray-200 transition-all duration-300 w-full sm:w-auto min-w-[120px] py-3 text-sm md:text-base"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline bg-white text-black hover:bg-gray-200 hover:border-gray-200 transition-all duration-300 w-full sm:w-auto min-w-[120px] py-3 text-sm md:text-base"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline btn-black hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto min-w-[120px] py-3 text-sm md:text-base border-white text-white hover:border-white"
                >
                  Register
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom spacing */}
      <div className="pb-8 md:pb-12 lg:pb-16"></div>
    </div>
  );
};

export default Home;
