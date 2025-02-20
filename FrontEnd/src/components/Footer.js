import React from "react";
import "../styles/global.css"; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footerBottom">
        <h4>
          <a href="/about">About Us</a> <br />
          Contact us at: <br />
          traveltide@gmail.com
        </h4>
        <div className="cc">
        © {new Date().getFullYear()} TravelTide. All rights reserved.
      </div>
      </div>
    </footer>
  );
};

export default Footer;
