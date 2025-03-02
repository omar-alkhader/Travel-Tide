import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">Travel Tide</div>
      <nav className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/package">Packages</Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "flights" }}>Flight</Link>
          </li>
          <li>
            <Link to="/" state={{ activeTab: "hotels" }}>Hotel</Link>
          </li>
          <li>
            <Link to="/">My Booking</Link>
          </li>
        </ul>
      </nav>
      <div className="signin">
        <button className="sign-btn">
          <Link to="/SignIn">Sign in</Link>
        </button>
      </div>
    </header>
  );
}

export default Navbar;