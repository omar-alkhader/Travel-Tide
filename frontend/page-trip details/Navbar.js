import React from "react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">Travel Tide</div>
      <nav className="nav-center">
        <ul>
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
