import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">Travel Tide</div>
      <nav className="nav-center">
        <ul className="nav-links">
          <li><a href="#">Packages</a></li>
          <li><a href="#">Flight</a></li>
          <li><a href="#">Hotel</a></li>
          <li><a href="#">My Booking</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
