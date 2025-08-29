import React from "react";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm6.5.5a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5.006 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17.006 22 12" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.11 4.07 7.13 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61a4.28 4.28 0 01-1.94-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.37-.02-.56A8.7 8.7 0 0024 4.59a8.48 8.48 0 01-2.54.7z" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-gray-800 w-full text-white py-8 mt-8 poppins-regular">
    <div className="text-center mb-4 text-lg font-semibold">
      Click Connect &mdash; Photographer & Videographer Booking & Management
    </div>
    <div className="flex justify-center gap-6 mb-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition-colors"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
    <div className="text-center text-gray-400 text-sm">
      &copy; {new Date().getFullYear()} Click Connect. All rights reserved.
    </div>
  </footer>
);

export default Footer;
