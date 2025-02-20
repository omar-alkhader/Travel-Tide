import React from "react";

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
      <div className="signin">
        <button className="sign-btn">
          <a href="SignIn">Sign in</a>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
