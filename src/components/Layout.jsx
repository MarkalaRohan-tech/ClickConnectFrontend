import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white">
      <Navbar />

      {/* Main content grows to fill space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer will always appear at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
