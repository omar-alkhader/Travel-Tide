import React from "react";
import "../styles/global.css"; // Ensure styling is applied

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footerBottom">
        <h4>
          <a href="/about">About Us</a> <br />
          Contact us at: <br />
          traveltide@gmail.com
        </h4>
      </div>
    </footer>
  );
};

export default Footer;