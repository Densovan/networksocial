import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Copyrigth &copy; {new Date().getFullYear()} Devconnector
      </footer>
    </div>
  );
};

export default Footer;
