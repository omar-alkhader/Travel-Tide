import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Travel Tide</Link>
      </div>
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