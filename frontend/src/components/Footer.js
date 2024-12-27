import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm" style={{ fontFamily: 'Lexend, sans-serif' }}>
          &copy; {new Date().getFullYear()} Macro. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-gray-400 hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-gray-400 hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
